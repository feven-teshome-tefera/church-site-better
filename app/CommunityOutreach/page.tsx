import { MinistryPageTemplate } from "@/components/ministry-page"

export default function CommunityOutreachPage() {
  return (
    <MinistryPageTemplate
      badge="Serving Neighbors"
      title="Community Outreach"
      subtitle="Loving our neighbors through service, care, and compassion."
      introTitle="Welcome to Community Outreach"
      introText="Our Community Outreach Ministry helps meet practical needs in our city through service projects, encouragement, and support. We believe sharing Christ's love means showing up for people consistently and compassionately."
      imageUrl="/Communit- Outreach.jpeg"
      faqs={[
        {
          question: "What does this ministry do?",
          answers: [
            "Organizes outreach initiatives and local service opportunities.",
            "Supports families and individuals with practical care.",
          ],
        },
        {
          question: "How can I get involved?",
          answers: [
            "Volunteer in outreach activities and special events.",
            "Support through prayer, giving, and partnership.",
          ],
        },
        {
          question: "Who can participate?",
          answers: ["Anyone with a heart to serve is welcome to join."],
        },
      ]}
    />
  )
}
