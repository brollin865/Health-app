<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Diagnosis extends Model {
    protected $fillable = ['disease_name','description','recommendation','symptom_rules'];
}
