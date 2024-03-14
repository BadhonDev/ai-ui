export function parseAnswerToHtml(answer) {
  let parsedAnswer = answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  parsedAnswer = parsedAnswer.trim()

  const parts = parsedAnswer.split(/\[([^\]]+)\]/g)

  const fragments = parts.map((part, index) => {
    if (index % 2 === 0) {
      return part
    }
  })

  return {
    answerHtml: fragments.join(""),
  }
}
