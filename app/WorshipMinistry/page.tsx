import { MinistryPageTemplate } from "@/components/ministry-page"

export default function WorshipMinistryPage() {
  return (
    <MinistryPageTemplate
      badge="Lift Your Voice"
      title="Worship Ministry"
      subtitle="Leading hearts into worship and praise."
      introTitle="Welcome to Worship Ministry"
      introText="Worship Ministry exists to help the church encounter God through music and praise. Whether you sing, play an instrument, or support behind the scenes, there is room for your gifts as we serve together."
      imageUrl="/worship.jpeg"
      faqs={[
        {
          question: "When does the team rehearse?",
          answers: [
            "Thursday evenings from 6:00 PM to 8:00 PM.",
            "Rehearsals are hosted at Emmanuel Baptist Church.",
          ],
        },
        {
          question: "What does ministry involve?",
          answers: [
            "Weekly service preparation and worship leading.",
            "Musical training, team collaboration, and prayer.",
          ],
        },
        {
          question: "How do I join?",
          answers: ["Contact the worship ministry team to begin an introduction and placement process."],
        },
      ]}
    />
  )
}
