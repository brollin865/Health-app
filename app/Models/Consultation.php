<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Consultation extends Model {
    protected $fillable = ['patient_id','symptoms','severity','notes','diagnosis_id','recommendation','status'];
    protected $casts    = ['symptoms' => 'array'];
    public function patient()   { return $this->belongsTo(Patient::class); }
    public function diagnosis() { return $this->belongsTo(Diagnosis::class); }
}
