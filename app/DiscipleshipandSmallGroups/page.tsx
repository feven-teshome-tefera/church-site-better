import { MinistryPageTemplate } from "@/components/ministry-page"

export default function DiscipleshipPage() {
  return (
    <MinistryPageTemplate
      badge="Growing Together"
      title="Discipleship & Small Groups"
      subtitle="Building stronger faith through Scripture, prayer, and fellowship."
      introTitle="Welcome to Discipleship & Small Groups"
      introText="Discipleship and small groups are where faith becomes personal and practical. In smaller gatherings, we study the Bible, pray for one another, and build relationships that encourage spiritual growth throughout the week."
      imageUrl="/Discipleship.jpg"
      faqs={[
        {
          question: "Who can join a small group?",
          answers: ["Everyone is welcome, whether you are new to faith or have walked with Christ for years."],
        },
        {
          question: "What happens in meetings?",
          answers: [
            "Bible study and meaningful discussion.",
            "Prayer, encouragement, and accountability.",
          ],
        },
        {
          question: "Where do groups meet?",
          answers: [
            "Groups meet on different days in homes and at church.",
            "You can be matched with a group that fits your schedule.",
          ],
        },
      ]}
    />
  )
}
