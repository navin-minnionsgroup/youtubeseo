<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function initiatePayment(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'amount' => 'required|numeric',
            'plan_name' => 'required|string',
        ]);

        $merchantKey = env('PAYU_MERCHANT_KEY');
        $salt = env('PAYU_MERCHANT_SALT');
        $actionUrl = env('PAYU_BASE_URL');

        $txnid = 'TXN_' . time() . rand(1000, 9999);

        // Save order to DB as pending
        Order::create([
            'txn_id' => $txnid,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'amount' => $request->amount,
            'plan_name' => $request->plan_name,
            'status' => 'pending',
        ]);

        $productInfo = $request->plan_name;
        $firstName = $request->name;
        $email = $request->email;
        $amount = number_format((float)$request->amount, 2, '.', '');
        $surl = route('payu.success');
        $furl = route('payu.failure');

        // PayU Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
        $hashSequence = "$merchantKey|$txnid|$amount|$productInfo|$firstName|$email|||||||||||$salt";
        $hash = strtolower(hash('sha512', $hashSequence));

        $payuParameters = [
            'key' => $merchantKey,
            'txnid' => $txnid,
            'amount' => $amount,
            'productinfo' => $productInfo,
            'firstname' => $firstName,
            'email' => $email,
            'phone' => $request->phone,
            'surl' => $surl,
            'furl' => $furl,
            'hash' => $hash,
            'action' => $actionUrl,
        ];

        return response()->json($payuParameters);
    }

    public function handleSuccess(Request $request)
    {
        $merchantKey = env('PAYU_MERCHANT_KEY');
        $salt = env('PAYU_MERCHANT_SALT');

        $status = $request->input('status');
        $firstname = $request->input('firstname');
        $amount = $request->input('amount');
        $txnid = $request->input('txnid');
        $postedHash = $request->input('hash');
        $key = $request->input('key');
        $productinfo = $request->input('productinfo');
        $email = $request->input('email');
        $payuMoneyId = $request->input('payuMoneyId');

        // Reverse hash verification sequence: salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
        $reverseHashSequence = "$salt|$status|||||||||||$email|$firstname|$productinfo|$amount|$txnid|$key";
        $calculatedHash = strtolower(hash('sha512', $reverseHashSequence));

        if ($calculatedHash === $postedHash && $status === 'success') {
            Order::where('txn_id', $txnid)->update([
                'status' => 'success',
                'payu_money_id' => $payuMoneyId,
            ]);

            return Inertia::render('PaymentStatus', [
                'status' => 'success',
                'message' => 'Payment Successful! Your YouTube SEO plan is active.',
                'txnid' => $txnid,
            ]);
        }

        return Inertia::render('PaymentStatus', [
            'status' => 'failed',
            'message' => 'Payment verification failed (Hash Mismatch).',
            'txnid' => $txnid,
        ]);
    }

    public function handleFailure(Request $request)
    {
        $txnid = $request->input('txnid');

        Order::where('txn_id', $txnid)->update([
            'status' => 'failed',
        ]);

        return Inertia::render('PaymentStatus', [
            'status' => 'failed',
            'message' => 'Payment failed or was canceled by user.',
            'txnid' => $txnid,
        ]);
    }
}