import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function createData(Day, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn){
    return{Day, Aquarius, Pisces, Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn}
}

const rows = [
    createData('March 1st', 'This', 'Is', 'All', 'Test', 'And', 'Example', 'Data', 'I\'m a Virgo', 'What are you?', 'Scorpio data', 'Capricorn Data', 'Wow lotta info'),

];
export default function Admin(){
    const classes = useStyles;

    return (
        <TableContainer component = {Paper}>
            <Table className={classes.table} aria-label="Heavenly Table">
                <caption>A Heavenly Horoscope Header, Honey!</caption>
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">Aquarius</TableCell>
                        <TableCell align="right">Pisces</TableCell>
                        <TableCell align="right">Aries</TableCell>
                        <TableCell align="right">Taurus</TableCell>
                        <TableCell align="right">Gemini</TableCell>
                        <TableCell align="right">Cancer</TableCell>
                        <TableCell align="right">Leo</TableCell>
                        <TableCell align="right">Virgo</TableCell>
                        <TableCell align="right">Libra</TableCell>
                        <TableCell align="right">Scorpio</TableCell>
                        <TableCell align="right">Sagittarius</TableCell>
                        <TableCell align="right">Capricorn</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) =>(
                        <TableRow key = {row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.Aquarius}</TableCell>
                        <TableCell align="right">{row.Pisces}</TableCell>
                        <TableCell align="right">{row.Aries}</TableCell>
                        <TableCell align="right">{row.Taurus}</TableCell>
                        <TableCell align="right">{row.Gemini}</TableCell>
                        <TableCell align="right">{row.Cancer}</TableCell>
                        <TableCell align="right">{row.Leo}</TableCell>
                        <TableCell align="right">{row.Virgo}</TableCell>
                        <TableCell align="right">{row.Libra}</TableCell>
                        <TableCell align="right">{row.Scorpio}</TableCell>
                        <TableCell align="right">{row.Sagittarius}</TableCell>
                        <TableCell align="right">{row.Capricorn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

}