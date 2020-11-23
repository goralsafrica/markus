import { model, Schema } from "mongoose";

const opts = {
  type: Number,
  required: true,
};

const emrSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  // height in cm
  height: opts,
  // weight in kg
  weight: opts,
  // calculated bmi
  bmi: opts,
  // temperature in degree celsius
  temperature: opts,
  // pulse in beats/min
  pulse: opts,
  // resporatory rate in beats/min
  respiratoryRate: opts,
  // blood oxygen saturation in %
  bloodOxygenSaturation: opts,
  // blood pressure
  //    FORMAT : systolic/diastolic
  bloodPressure: {
    systolic: opts,
    diastolic: opts,
  },
});

export default model("EMR", emrSchema);
