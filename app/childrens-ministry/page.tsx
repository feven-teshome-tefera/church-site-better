import { MinistryPageTemplate } from "@/components/ministry-page"

export default function ChildrensMinistryPage() {
  return (
    <MinistryPageTemplate
      badge="Growing In Faith"
      title="Children's Ministry"
      subtitle="Helping children know Jesus and grow in His love."
      introTitle="Welcome to Children's Ministry"
      introText="Our Children's Ministry is a joyful and safe place for kids ages 4-12 to learn about Jesus, build friendships, and develop a life of faith through Bible stories, worship, and age-appropriate activities."
      imageUrl="/children-minsitry.jpeg"
      faqs={[
        {
          question: "When and where do children meet?",
          answers: [
            "Every Sunday during the main worship service.",
            "Children gather in the church children's hall.",
          ],
        },
        {
          question: "What happens in each session?",
          answers: [
            "Interactive Bible lessons and storytelling.",
            "Songs, prayer, games, and creative activities.",
          ],
        },
        {
          question: "Who leads the ministry?",
          answers: [
            "Trained and caring teachers who are committed to loving and guiding each child.",
          ],
        },
      ]}
    />
  )
}
