<?php

namespace App\Models;

use App\Traits\ImageUpload;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class ProductSize extends Model
{
    use HasFactory, ImageUpload;

    protected $fillable = [
        'name',
        'value',
        'weight',
        'image',
        'status',
    ];

    public function getList(): Collection
    {
        return ProductSize::query()
            ->select(['id', 'name', 'value', 'weight', 'image'])
            ->where('status', true)
            ->get();
    }
}
