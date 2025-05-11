import { Standing, Team } from "../models/index.js";

export async function getStandings(req, res, next) {
  try {
    const standings = await Standing.findAll({
      include: [{ model: Team, attributes: ["id", "name", "logo_url"] }],
      order: [
        ["win", "DESC"],
        ["points", "DESC"],
      ],
    });
    res.json(standings);
  } catch (err) {
    console.error("❌ Error getStandings:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

export async function createStanding(req, res, next) {
  const { teamId, played, win, draw, loss } = req.body;

  try {
    console.log("Menerima request dengan data:", req.body); // Debugging
    const points = win * 3 + draw;

    // Create new standing entry
    const newStanding = await Standing.create({
      team_id: teamId,
      played,
      win,
      draw,
      loss,
      points,
    });

    res.status(201).json(newStanding);
  } catch (err) {
    console.error("❌ Error createStanding:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

export const updateStanding = async (req, res) => {
  try {
    const { id } = req.params;
    const { played, win, draw, loss } = req.body;
    const standing = await Standing.findByPk(id);
    if (!standing) return res.status(404).json({ message: "Not found" });

    await standing.update({ played, win, draw, loss });
    res.json({ message: "Updated", standing });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteStanding = async (req, res) => {
  try {
    const { id } = req.params;
    const standing = await Standing.findByPk(id);
    if (!standing) return res.status(404).json({ message: "Not found" });

    await standing.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
