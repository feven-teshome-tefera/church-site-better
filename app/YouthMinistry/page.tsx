import { MinistryPageTemplate } from "@/components/ministry-page"

export default function YouthMinistryPage() {
  return (
    <MinistryPageTemplate
      badge="Next Generation"
      title="Youth Ministry"
      subtitle="Raising disciples for the next generation."
      introTitle="Welcome to Youth Ministry"
      introText="Youth Ministry is a place for teens to build real friendships, grow in God's Word, and discover purpose. We create a welcoming environment where every young person can belong, ask questions, and follow Jesus with confidence."
      imageUrl="/youth.jpeg"
      faqs={[
        {
          question: "When do youth gatherings happen?",
          answers: [
            "Every Saturday afternoon at 3:00 PM.",
            "Meetings are held at Emmanuel Baptist Church.",
          ],
        },
        {
          question: "What can students expect?",
          answers: [
            "Fun activities and genuine friendships.",
            "Worship, Bible teaching, and small-group discussion.",
          ],
        },
        {
          question: "Who can join?",
          answers: ["Youth ages 13-19 are welcome. There is no registration fee."],
        },
      ]}
    />
  )
}
