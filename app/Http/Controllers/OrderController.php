<?php

namespace App\Http\Controllers;

use App\Events\PaymentInvoiceEvent;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\OrderInvoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class OrderController extends CartController
{

    public function invoice(Request $request)
    {

        $invoice = OrderInvoice::query()
            ->where('id_hash', $request->id_hash)
            ->orderByDesc('id')
            ->firstOrFail();

        $invoiceHtml = view('pdf.order_invoice', ['order' => $invoice->order])->render();
        return Pdf::loadHTML($invoiceHtml)
            ->stream("invoice-". date('Y-m-d H_i') .".pdf");
    }

    public function store(OrderRequest $request, Order $order)
    {

        $order->fill($request->validated());
        $order->products = $this->cart()->getContent();
        if ($order->save()) {

            if ($order->isPaymentInvoice()) {
                $orderInvoice = $this->createInvoice($order->id);

                // Отправить счет на оплату
                event(new PaymentInvoiceEvent($orderInvoice));
            }

            if ($currentUser = $this->cart()->user())
                $this->createHistory($order->id);

            $this->cart()->clear();
            return response()->json([
                'status' => 'success',
                'message' => 'Заказ успешно создан!',
//                'invoice_url' => $invoiceUrl,
                'is_guest' => !$currentUser
            ]);
        }

        return response()->json(['status' => 'error'], 500);
    }

    protected function createHistory(int $orderId)
    {
        $history = new OrderHistory();
        $history->user_id = $this->cart()->user()->id;
        $history->order_id = $orderId;
        $history->save();

        return $history;
    }

    protected function createInvoice(int $orderId)
    {
        $invoice = new OrderInvoice();
        $invoice->id_hash = md5(uniqid().mt_rand());
        $invoice->user_id = $this->cart()->user()->id ?? null;
        $invoice->order_id = $orderId;
        $invoice->save();

        return $invoice;
    }
}
