import { Request, Response } from 'express';
import conn from '../database';
import { parsePersons } from '../models/person';

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

export async function endVoteOne(req: Request, res: Response) {

    conn.query(`UPDATE vote_status SET status = 'voting_2'`)
    .then(() => {

        res.status(200).json({
            message: 'OK'
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

export async function endVoteTwo(req: Request, res: Response) {

    let final_persons = [];

    await conn.query(`SELECT * FROM persons_list_one ORDER BY votes_quantity DESC LIMIT 2`)
    .then((resp) => {
        const data = resp.rows;
        data.map(person => {
            final_persons.push(person);
        });
    });

    await conn.query(`SELECT * FROM persons_list_two ORDER BY votes_quantity DESC LIMIT 2`)
    .then((resp) => {
        const data = resp.rows;
        data.map(person => {
            final_persons.push(person);
        });
    });

    await conn.query(`INSERT INTO persons_list_final (name,description,image_url) VALUES ${parsePersons(final_persons)}`)
    .catch((err) => {
        console.log(err);
        return res.status(400).send({
            status: 'ERROR',
            message: err.message
        });
    });

    conn.query(`UPDATE vote_status SET status = 'final'`)
    .then(() => {

        res.status(200).json({
            message: 'OK'
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

export async function getVoteStatus(req: Request, res: Response) {

    conn.query(`SELECT status FROM vote_status`)
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

export async function getPersonsListOne(req: Request, res: Response) {

    conn.query(`SELECT * FROM persons_list_one ORDER BY votes_quantity DESC, name ASC`)
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

export async function getPersonsListTwo(req: Request, res: Response) {

    conn.query(`SELECT * FROM persons_list_two ORDER BY votes_quantity DESC, name ASC`)
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

export async function getPersonsListFinal(req: Request, res: Response) {

    conn.query(`SELECT * FROM persons_list_final ORDER BY votes_quantity DESC, name ASC`)
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

export async function updateVotesOne(req: Request, res: Response) {

    conn.query(`UPDATE persons_list_one SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
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

export async function updateVotesTwo(req: Request, res: Response) {

    conn.query(`UPDATE persons_list_two SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
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

export async function updateVotesFinal(req: Request, res: Response) {

    conn.query(`UPDATE persons_list_final SET votes_quantity = votes_quantity + 1 WHERE id = ${req.params.id}`)
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

    conn.query(`UPDATE persons_list_one, persons_list_two, persons_list_final SET votes_quantity = 0;`)
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