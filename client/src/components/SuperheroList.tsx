import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TablePagination } from '@mui/material';

interface Superhero {
    id: string;
    name: string;
    superpower: string;
    humility_score: number;
}

const SuperheroList: React.FC = () => {
    const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const apiUrl = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const fetchSuperheroes = async () => {
            const response = await fetch(`${apiUrl}/superheros?page=${page + 1}&pageSize=${pageSize}`);
            const data = await response.json();
            setSuperheroes(data.data);
            setTotalItems(data.pagination.total);
        };

        fetchSuperheroes();
    }, [page, pageSize]);

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <TableContainer
                component={Paper}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '100vw',
                    height: '100vh',
                }}
            >
                <Table
                    aria-label="simple table"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: '100%',
                        margin: 5,
                        padding: 5,
                    }}
                >
                    <div>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Superpower</TableCell>
                                <TableCell align="right">Humility Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {superheroes.map((superhero) => (
                                <TableRow
                                    key={superhero.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {superhero.name}
                                    </TableCell>
                                    <TableCell align="left">{superhero.superpower}</TableCell>
                                    <TableCell align="right">{superhero.humility_score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </div>
                </Table>
                <TablePagination
                    component="div"
                    count={totalItems}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </TableContainer>
        </div>
    );
};

export default SuperheroList;
