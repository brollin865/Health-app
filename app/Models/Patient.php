<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Patient extends Model {
    protected $fillable = ['user_id','full_name','age','gender','phone','address','emergency_contact','medical_history'];
    public function user() { return $this->belongsTo(User::class); }
    public function consultations() { return $this->hasMany(Consultation::class); }
    public function diagnosisHistories() { return $this->hasMany(DiagnosisHistory::class); }
}
