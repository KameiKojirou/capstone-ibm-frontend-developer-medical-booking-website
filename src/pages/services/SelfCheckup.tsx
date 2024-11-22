import { Title } from "../../components/Title";
import { SelfCheckupItem } from "../../components/SelfCheckupItem";

export const SelfCheckup = () => {
    return (
        <div className="p-6">
            <Title>Self Checkup</Title>
            <p className="mb-6">
                Taking care of your health starts with small steps. Follow these self-checkup tips
                to monitor your well-being and stay on top of your health.
            </p>
            <div className="space-y-8">
                <SelfCheckupItem
                    title="Check Your Temperature"
                    summary="A normal body temperature ranges from 97°F to 99°F."
                    details="If you feel feverish, use a thermometer to check your temperature. Fever is usually a sign that your body is fighting an infection. Seek medical attention if your fever exceeds 102°F or persists for more than 48 hours."
                    position="start"
                />
                <SelfCheckupItem
                    title="Monitor Your Heart Rate"
                    summary="A normal resting heart rate is between 60 and 100 beats per minute."
                    details="To measure your heart rate, place two fingers on your wrist or neck and count the beats for 15 seconds, then multiply by four. Irregular or rapid heartbeats may warrant medical advice, especially if accompanied by dizziness or chest pain."
                    position="end"
                />
                <SelfCheckupItem
                    title="Assess Your Hydration"
                    summary="Dark yellow urine may indicate dehydration."
                    details="Drink at least 8 cups of water daily, more if you are active or in a hot climate. Dehydration can cause fatigue, dizziness, and confusion. Severe dehydration may require medical assistance."
                    position="start"
                />
                <SelfCheckupItem
                    title="Examine Your Skin"
                    summary="Check for unusual moles or changes in your skin."
                    details="Use a mirror or ask someone to check areas that are hard to see. Look for asymmetry, irregular borders, changes in color, or growth in size of moles. Consult a dermatologist for suspicious changes."
                    position="end"
                />
            </div>
        </div>
    );
};
