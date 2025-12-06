const mysql = require('mysql2/promise');

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    const connection = await mysql.createConnection({
        host: "YOUR_AURORA_ENDPOINT",
        user: "YOUR_DB_USER",
        password: "YOUR_DB_PASSWORD",
        database: "customer_form"
    });

    const query = `
        INSERT INTO requirements
        (name, address, contact, requirement, preferred_date, preferred_time, photos)
        VALUES (?, ?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)
    `;
    await connection.execute(query, [
        data.name,
        data.address,
        data.contact,
        data.requirement,
        data.preferred_date,
        data.preferred_time,
        JSON.stringify(data.photos)
    ]);

    await connection.end();

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Form submitted successfully" })
    };
};
