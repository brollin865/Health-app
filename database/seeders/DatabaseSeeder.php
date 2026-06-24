<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Symptom;
use App\Models\Diagnosis;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed symptoms
        $symptoms = [
            ['name' => 'Fever',                    'description' => 'Elevated body temperature above 37.5°C'],
            ['name' => 'Headache',                 'description' => 'Pain or pressure in the head'],
            ['name' => 'Cough',                    'description' => 'Dry or productive cough'],
            ['name' => 'Fatigue',                  'description' => 'Extreme tiredness or weakness'],
            ['name' => 'Chest Pain',               'description' => 'Pain or discomfort in the chest'],
            ['name' => 'Vomiting',                 'description' => 'Forceful expulsion of stomach contents'],
            ['name' => 'Nausea',                   'description' => 'Feeling of sickness with urge to vomit'],
            ['name' => 'Dizziness',                'description' => 'Sensation of spinning or lightheadedness'],
            ['name' => 'Shortness of Breath',      'description' => 'Difficulty breathing or breathlessness'],
            ['name' => 'Joint Pain',               'description' => 'Pain or discomfort in the joints'],
            ['name' => 'Chills',                   'description' => 'Feeling of coldness with shivering'],
            ['name' => 'Loss of Appetite',         'description' => 'Reduced desire to eat'],
            ['name' => 'Abdominal Pain',           'description' => 'Pain or cramping in the stomach area'],
            ['name' => 'Diarrhoea',                'description' => 'Loose or watery stools'],
            ['name' => 'Sore Throat',              'description' => 'Pain or irritation in the throat'],
            ['name' => 'Runny Nose',               'description' => 'Excess nasal discharge'],
            ['name' => 'Rash',                     'description' => 'Skin irritation or discolouration'],
            ['name' => 'Sweating',                 'description' => 'Excessive perspiration'],
            ['name' => 'Back Pain',                'description' => 'Pain in the lower or upper back region'],
            ['name' => 'Pale Skin',                'description' => 'Unusually light or white skin colour'],
        ];

        foreach ($symptoms as $s) {
            Symptom::firstOrCreate(['name' => $s['name']], $s);
        }

        // Seed diagnoses with symptom_rules (IDs 1-20 matching above)
        $diagnoses = [
            [
                'disease_name'   => 'Malaria',
                'description'    => 'A mosquito-borne infectious disease caused by Plasmodium parasites.',
                'recommendation' => 'Seek immediate medical attention. Laboratory RDT/blood smear test required. Prescribe artemether-lumefantrine after confirmation.',
                'symptom_rules'  => json_encode([1, 2, 4, 8, 11, 18, 20]),
            ],
            [
                'disease_name'   => 'Typhoid Fever',
                'description'    => 'A bacterial infection caused by Salmonella typhi spread through contaminated food and water.',
                'recommendation' => 'Visit hospital immediately. Blood culture test required. Prescribe ciprofloxacin or azithromycin pending results.',
                'symptom_rules'  => json_encode([1, 2, 4, 6, 7, 12, 13]),
            ],
            [
                'disease_name'   => 'Influenza (Flu)',
                'description'    => 'A highly contagious respiratory illness caused by influenza viruses.',
                'recommendation' => 'Rest, drink plenty of fluids, take paracetamol for fever. Return if symptoms worsen or persist beyond 5 days.',
                'symptom_rules'  => json_encode([1, 2, 3, 4, 11, 15, 16]),
            ],
            [
                'disease_name'   => 'Pneumonia',
                'description'    => 'An infection that inflames air sacs in one or both lungs.',
                'recommendation' => 'Seek urgent medical attention. Chest X-ray required. Prescribe amoxicillin or azithromycin. Monitor oxygen levels.',
                'symptom_rules'  => json_encode([1, 3, 4, 5, 9]),
            ],
            [
                'disease_name'   => 'COVID-19',
                'description'    => 'A respiratory illness caused by the SARS-CoV-2 coronavirus.',
                'recommendation' => 'Isolate immediately. PCR test recommended. Paracetamol for fever. Seek hospital care if oxygen drops below 95%.',
                'symptom_rules'  => json_encode([1, 3, 4, 9, 12]),
            ],
            [
                'disease_name'   => 'Gastroenteritis',
                'description'    => 'Inflammation of the stomach and intestines, usually caused by viral or bacterial infection.',
                'recommendation' => 'Stay hydrated with ORS. Rest. Visit clinic if symptoms persist beyond 48 hours or blood appears in stool.',
                'symptom_rules'  => json_encode([6, 7, 13, 14, 12]),
            ],
            [
                'disease_name'   => 'Hypertension',
                'description'    => 'High blood pressure that can lead to serious heart and kidney complications.',
                'recommendation' => 'Visit hospital for blood pressure check. Reduce salt intake. Exercise regularly. Antihypertensive medication if BP >140/90.',
                'symptom_rules'  => json_encode([2, 5, 8, 9]),
            ],
            [
                'disease_name'   => 'Anaemia',
                'description'    => 'A condition in which the blood lacks enough healthy red blood cells or haemoglobin.',
                'recommendation' => 'Full blood count test required. Iron and folate supplements. Dietary advice: eat iron-rich foods.',
                'symptom_rules'  => json_encode([4, 8, 12, 20, 18]),
            ],
        ];

        foreach ($diagnoses as $d) {
            Diagnosis::firstOrCreate(['disease_name' => $d['disease_name']], $d);
        }

        // Seed default admin user
        User::firstOrCreate(['email' => 'admin@healthapp.vu.ac.ug'], [
            'name'     => 'System Administrator',
            'email'    => 'admin@healthapp.vu.ac.ug',
            'password' => Hash::make('Admin@1234'),
            'role'     => 'admin',
        ]);

        // Seed default doctor
        User::firstOrCreate(['email' => 'doctor@healthapp.vu.ac.ug'], [
            'name'     => 'Dr. Sarah Namutebi',
            'email'    => 'doctor@healthapp.vu.ac.ug',
            'password' => Hash::make('Doctor@1234'),
            'role'     => 'doctor',
        ]);

        echo "Database seeded successfully.\n";
    }
}
