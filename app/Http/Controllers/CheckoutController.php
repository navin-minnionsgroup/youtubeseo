<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Initiate PayU payment.
     */
    public function initiatePayment(Request $request)
    {
        $request->validate([
            'customer.name' => 'required|string|max:255',
            'customer.email' => 'required|email',
            'customer.phone' => 'required|string|max:20',
            'customer.channel' => 'required|string',
            'customer.niche' => 'nullable|string',
            'customer.note' => 'nullable|string',

            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string|max:100',
            'items.*.price' => 'required|numeric|min:0.01',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $customer = $request->input('customer');
        $items = $request->input('items');

        // Calculate amount on the server.
        $amount = 0;
        $planNames = [];

        foreach ($items as $item) {
            $amount += (float) $item['price'] * (int) $item['qty'];

            $planNames[] = $item['name'] . ' x' . $item['qty'];
        }

        $amount = round($amount, 2);

        // Keep productinfo simple and consistent.
        $productInfo = implode(', ', $planNames);

        $productInfo = preg_replace(
            '/[^A-Za-z0-9@._\/ -]/',
            ' ',
            $productInfo
        );

        $productInfo = substr(trim($productInfo), 0, 100);

        $formattedAmount = number_format($amount, 2, '.', '');

        // Generate unique transaction ID.
        $txnid = 'TXN_' . time() . rand(1000, 9999);

        $merchantKey = config('services.payu.key');
        $salt = config('services.payu.salt');
        $actionUrl = config('services.payu.base_url');

        if (!$merchantKey || !$salt || !$actionUrl) {
            Log::error('PayU configuration missing.');

            return response()->json([
                'message' => 'Payment configuration error.',
            ], 500);
        }

        $firstName = trim($customer['name']);
        $email = trim($customer['email']);

        // Create pending order.
        Order::create([
            'txn_id' => $txnid,
            'name' => $firstName,
            'email' => $email,
            'phone' => $customer['phone'],
            'channel' => $customer['channel'],
            'niche' => $customer['niche'] ?? 'Vlogging',
            'note' => $customer['note'] ?? null,
            'amount' => $formattedAmount,
            'plan_name' => $productInfo,
            'status' => 'pending',
        ]);

        $surl = route('payu.success');
        $furl = route('payu.failure');

        // UDF values are empty because we are not using them.
        $udf1 = '';
        $udf2 = '';
        $udf3 = '';
        $udf4 = '';
        $udf5 = '';

        // PayU outbound hash sequence.
        $hashSequence = implode('|', [
            $merchantKey,
            $txnid,
            $formattedAmount,
            $productInfo,
            $firstName,
            $email,
            $udf1,
            $udf2,
            $udf3,
            $udf4,
            $udf5,
            '',
            '',
            '',
            '',
            '', // udf6 to udf10
            $salt,
        ]);

        $hash = strtolower(hash('sha512', $hashSequence));

        return response()->json([
            'txnid' => $txnid,
            'amountPaise' => (int) round($amount * 100),
            'payuUrl' => $actionUrl,

            'params' => [
                'key' => $merchantKey,
                'txnid' => $txnid,
                'amount' => $formattedAmount,
                'productinfo' => $productInfo,
                'firstname' => $firstName,
                'email' => $email,
                'phone' => $customer['phone'],
                'surl' => $surl,
                'furl' => $furl,
                'hash' => $hash,
                'udf1' => $udf1,
                'udf2' => $udf2,
                'udf3' => $udf3,
                'udf4' => $udf4,
                'udf5' => $udf5,
            ],
        ]);
    }

    /**
     * Handle PayU successful callback.
     */
    public function handleSuccess(Request $request)
    {
        $key = config('services.payu.key');
        $salt = config('services.payu.salt');

        $status = (string) $request->input('status', '');
        $firstname = (string) $request->input('firstname', '');
        $amount = (string) $request->input('amount', '');
        $txnid = (string) $request->input('txnid', '');
        $postedHash = strtolower((string) $request->input('hash', ''));
        $productinfo = (string) $request->input('productinfo', '');
        $email = (string) $request->input('email', '');

        $udf1 = (string) $request->input('udf1', '');
        $udf2 = (string) $request->input('udf2', '');
        $udf3 = (string) $request->input('udf3', '');
        $udf4 = (string) $request->input('udf4', '');
        $udf5 = (string) $request->input('udf5', '');

        // Regular PayU reverse hash sequence.
        $reverseHashSequence =
            $salt . '|' .
            $status . '||||||' .
            $udf5 . '|' .
            $udf4 . '|' .
            $udf3 . '|' .
            $udf2 . '|' .
            $udf1 . '|' .
            $email . '|' .
            $firstname . '|' .
            $productinfo . '|' .
            $amount . '|' .
            $txnid . '|' .
            $key;

        // Handle additional charges if provided by PayU.
        $additionalCharges = $request->input('additionalCharges');

        if ($additionalCharges === null) {
            $additionalCharges = $request->input('additional_charges');
        }

        if ($additionalCharges !== null && $additionalCharges !== '') {
            $reverseHashSequence =
                $additionalCharges . '|' . $reverseHashSequence;
        }

        $calculatedHash = strtolower(
            hash('sha512', $reverseHashSequence)
        );

        // Find order.
        $order = Order::where('txn_id', $txnid)->first();

        // Verify hash.
        $isValidHash = $postedHash !== ''
            && hash_equals($calculatedHash, $postedHash);

        // Verify transaction details.
        $isValidTransaction = $order
            && (float) $order->amount === (float) $amount
            && $order->email === $email;

        // Verify merchant key.
        $isValidKey = $request->input('key') === $key;

        if (!$isValidHash || !$isValidTransaction || !$isValidKey) {
            Log::warning('PayU verification failed', [
                'txnid' => $txnid,
                'hash_valid' => $isValidHash,
                'transaction_valid' => $isValidTransaction,
                'key_valid' => $isValidKey,
                'received_hash' => $postedHash,
                'calculated_hash' => $calculatedHash,
            ]);

            return Inertia::render('PaymentStatus', [
                'status' => 'failed',
                'message' => 'Payment verification failed (Hash Mismatch).',
                'txnid' => $txnid,
            ]);
        }

        // Only mark successful when PayU reports success.
        if ($status === 'success') {

            $order->update([
                'status' => 'success',
                'payu_money_id' => $request->input('mihpayid')
                    ?? $request->input('payuMoneyId'),
            ]);

            return Inertia::render('PaymentStatus', [
                'status' => 'success',
                'message' => 'Payment Successful! Your YouTube SEO plan is active.',
                'txnid' => $txnid,
            ]);
        }

        $order->update([
            'status' => 'failed',
        ]);

        return Inertia::render('PaymentStatus', [
            'status' => 'failed',
            'message' => 'Payment failed or was canceled by user.',
            'txnid' => $txnid,
        ]);
    }

    /**
     * Handle PayU failure callback.
     */
    public function handleFailure(Request $request)
    {
        $txnid = $request->input('txnid');

        $order = Order::where('txn_id', $txnid)->first();

        if ($order && $order->status === 'pending') {
            $order->update([
                'status' => 'failed',
            ]);
        }

        return Inertia::render('PaymentStatus', [
            'status' => 'failed',
            'message' => 'Payment failed or was canceled by user.',
            'txnid' => $txnid,
        ]);
    }
}
