import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
// 1. Cas où le paramètre date est vide (/api ou /api/)
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// 2. Cas avec un paramètre date (/api/:date)
app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  // Si c'est un timestamp numérique (uniquement des chiffres)
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date, 10));
  } else {
    // Sinon, c'est une chaîne de date (ex: "2015-12-25")
    parsedDate = new Date(date);
  }

  // Vérifier si la date est valide
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
