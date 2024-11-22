import { BlogCard } from "../components/BlogCard";
import { Title } from "../components/Title";

export const Blog = () => {
    return (
        <div>
            <Title>Health Blog</Title>
            <div className="flex flex-col flex-wrap justify-center gap-2">
            <BlogCard title="The Importance of Regular Exercise" date="2023-02-15">
                <p>
                    Exercise is not just about losing weight or building muscle. It’s a crucial component of maintaining overall health, improving mental clarity, and boosting mood.
                </p>
                <p>
                    Regular physical activity reduces the risk of chronic diseases such as heart disease, diabetes, and certain types of cancer. It strengthens your heart and lungs while improving circulation.
                </p>
                <p>
                    Whether it's walking, yoga, or weight training, find an activity you enjoy. Consistency is key to reaping the long-term benefits of an active lifestyle.
                </p>
            </BlogCard>
            <BlogCard title="Eating Right: The Key to a Balanced Diet" date="2023-03-10">
                <p>
                    A balanced diet is essential for maintaining a healthy weight, fueling your body, and preventing illnesses. It provides your body with the necessary nutrients it needs to function optimally.
                </p>
                <p>
                    Focus on incorporating whole foods, such as fruits, vegetables, lean proteins, and whole grains. Avoid processed foods and sugary drinks, as they can lead to health problems over time.
                </p>
                <p>
                    Remember, moderation is key. It’s okay to indulge occasionally as long as you maintain a healthy overall eating pattern.
                </p>
            </BlogCard>
            <BlogCard title="How to Manage Stress Effectively" date="2023-04-20">
                <p>
                    Stress is an unavoidable part of life, but managing it effectively is crucial for your mental and physical well-being. Chronic stress can lead to serious health issues such as high blood pressure and weakened immunity.
                </p>
                <p>
                    Techniques such as mindfulness meditation, deep breathing, and regular exercise can significantly reduce stress levels. It’s also important to prioritize sleep and maintain a healthy work-life balance.
                </p>
                <p>
                    Don’t hesitate to seek support from friends, family, or a professional if you feel overwhelmed. Talking about your concerns can be therapeutic and help you gain perspective.
                </p>
            </BlogCard>
            <BlogCard title="Hydration: Why Water is Essential" date="2023-05-05">
                <p>
                    Water is vital for every function in your body, from regulating temperature to flushing out toxins. Staying hydrated ensures your organs function efficiently and helps maintain energy levels.
                </p>
                <p>
                    Aim to drink at least 8 glasses of water a day. This can vary depending on factors like your activity level and the climate you live in. If you’re active or it’s particularly hot, you may need more.
                </p>
                <p>
                    Keep a water bottle handy as a reminder to sip throughout the day. You can also hydrate with water-rich foods like cucumbers, watermelon, and oranges.
                </p>
            </BlogCard>
            <BlogCard title="The Role of Sleep in Health and Wellness" date="2023-06-10">
                <p>
                    Sleep is a cornerstone of good health, yet it’s often overlooked. Adults need 7-9 hours of quality sleep per night to allow the body to recover and the mind to process the day.
                </p>
                <p>
                    Poor sleep can lead to a weakened immune system, memory problems, and an increased risk of chronic conditions like obesity and heart disease. Prioritize a consistent sleep schedule to improve your overall well-being.
                </p>
                <p>
                    Create a sleep-friendly environment by minimizing noise, reducing light exposure, and avoiding screens before bedtime. Practicing relaxation techniques can also help you wind down for a restful night.
                </p>
            </BlogCard>


            </div>
        </div>
    )
}