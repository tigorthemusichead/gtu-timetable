module.exports = async () => {
    const response = await fetch('https://leqtori.gtu.ge/2023__2024/I/B/info')
    const entryPage = await response.text()
    const groupIndex = entryPage.indexOf('ჯგუფები/Groups')
    const groupPart = entryPage.slice(groupIndex - 100, groupIndex + 100)
    const linkStartIndex = groupPart.indexOf('href="')
    const linkPart = groupPart.slice(linkStartIndex + 6)
    const linkEndIndex = linkPart.indexOf('"')
    const link = linkPart.slice(0, linkEndIndex)
    return link
}