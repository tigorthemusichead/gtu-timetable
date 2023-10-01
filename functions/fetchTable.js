const fs = require('fs')
const fetchPage = require("./fetchPage")

module.exports = async (group_number) => {
    const link = await fetchPage()
    const response = await fetch(link)
    const html = await response.text()
    const groupNumberIndex = html.indexOf(group_number)
    const groupIndexPart = html.slice(groupNumberIndex - 50, groupNumberIndex)
    const firstQuoteIndex = groupIndexPart.indexOf('"')
    const lastQuoteIndex = groupIndexPart.lastIndexOf('"')
    const groupID = groupIndexPart.slice(firstQuoteIndex + 2, lastQuoteIndex)
    const tableIndex = html.lastIndexOf(groupID)
    const tablePart = html.slice(tableIndex - 30)
    const tableStartIndex = tablePart.indexOf('<table')
    const nextTableStartIndex = tablePart.slice(100).indexOf('<table id="table')
    // console.log(tablePart.slice(nextTableStartIndex - 150, nextTableStartIndex + 150))
    const rawTable = tablePart.slice(tableStartIndex, nextTableStartIndex + 150)
    const tableEndIndex = rawTable.lastIndexOf('</table>')
    const table = tablePart.slice(tableStartIndex, tableEndIndex + 32)

    const htmlTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                                <html xmlns="http://www.w3.org/1999/xhtml" lang="ge" xml:lang="ge">
                                  <head>
                                    <title>საქართველოს ტექნიკური უნივერსიტეტი/Georgian Technical University</title>
                                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                                  </head>
                                  <body>
                                    ${table}
                                  </body>
                                </html>`

    /* fs.writeFile('../public/index.html', htmlTemplate, (err) => {
        if (err) console.error(err)
    }) */
    return htmlTemplate
}
