import db from "../config/db.js";

export const getStaff = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        status
       FROM staff
       ORDER BY id DESC`
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const addStaff = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, role,status } = req.body;
        if(!firstName||!lastName||!email||!phone||!role){
            return res.json({message:"All Fields Are Require"})
        }
          

        await db.query(
            `INSERT INTO staff 
      (first_name, last_name, email, phone, role,status)
      VALUES (?, ?, ?, ?, ?,?)`,
            [firstName, lastName, email, phone, role,status]
        );

        res.json({ message: "Staff added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName,email, phone, role } = req.body;

        await db.query(
            `UPDATE staff 
       SET first_name=?, last_name=?,email=?, phone=?, role=?
       WHERE id=?`,
            [firstName, lastName,email, phone, role, id]
        );

        res.json({ message: "Staff updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const toggleStaffStatus = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      `UPDATE staff
       SET status = CASE 
         WHEN status = 'ACTIVE' THEN 'INACTIVE'
         ELSE 'ACTIVE'
       END
       WHERE id = ?`,
      [id]
    );

    res.json({ message: "Status toggled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM staff WHERE id=?", [id]);

    res.json({ message: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  
};
export const getSupportAgents = async (req, res) => {
  try {
    const [agents] = await db.query(
     "SELECT id, first_name, last_name, email, role FROM staff WHERE status = 'ACTIVE'"
    );

    res.json(agents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};