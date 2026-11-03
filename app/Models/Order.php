<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'txn_id',
        'name',
        'email',
        'phone',
        'amount',
        'plan_name',
        'status',
        'payu_money_id',
    ];   
}
