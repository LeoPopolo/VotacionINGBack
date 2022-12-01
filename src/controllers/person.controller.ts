import { Request, Response } from 'express';
import conn from '../database';

export async function addPerson(req: Request, res: Response) {

    conn.query(`INSERT INTO persons (name,description,image_url) VALUES ('${req.body.name}','${req.body.description}','${req.body.image_url}') RETURNING *`)
    .then(resp => {
     
        const data = resp.rows[0];

        res.status(200).json({
            ...data
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}

export async function getPersons(req: Request, res: Response) {

    conn.query(`SELECT * FROM persons ORDER BY votes_quantity DESC, name ASC`)
    .then(resp => {
     
        const data = resp.rows;

        res.status(200).json({
            data
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}

export async function updateVotes(req: Request, res: Response) {

    conn.query(`UPDATE persons SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
    .then(() => {

        res.status(200).json({
            status: 'OK',
            message: 'User voted!'
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}

export async function restartVotes(req: Request, res: Response) {

    conn.query(`UPDATE persons SET votes_quantity = 0`)
    .then(() => {

        res.status(200).json({
            status: 'OK',
            message: 'Votes restarted!'
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });
}