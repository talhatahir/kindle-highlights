let fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "My Clippings.txt");

const ObjectsToCsv = require("objects-to-csv");

fs.readFile(filePath, "utf8", function (err, data) {
  if (err) throw err;
  const bookHighlights = [];
  const highlights = data.toString().split("==========");
  for (let i in highlights) {
    const groupedHighlights = highlights[i].toString().trim().split("\n");

    if (
      !groupedHighlights[0] ||
      !groupedHighlights[1] ||
      !groupedHighlights[3]
    ) {
      continue;
    }

    const book = {};
    book.Book = groupedHighlights[0].trim();
    book.Location = groupedHighlights[1].replace("-", "").trim();
    book.Highlight = groupedHighlights[3];

    bookHighlights.push(book);
  }

  (async () => {
    const csv = new ObjectsToCsv(bookHighlights);
    // Save to file:
    await csv.toDisk("./output/highlights.csv");
    // Return the CSV file as string:
    console.log("All done!");
  })();
});
