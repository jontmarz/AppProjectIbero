import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

export const TableRecords = ({ data }) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'TitleRecord', headerName: 'Título del antecedente', width: 200 },
        { field: 'AutorRecord', headerName: 'Autor(es)', width: 200 },
        { field: 'ResumeRecord', headerName: 'Resumen', width: 200 },
        { field: 'LinkRecord', headerName: 'Link de consulta', width: 200 },
        { field: 'NumberQuotes', headerName: 'Número de citas', width: 100 },
        { field: 'ResearchContribute', headerName: 'Aportes de Investigación', width: 200 },
    ]

    const rows = [
        { id: 1, TitleRecord: 'Título de la obra', AutorRecord: 'Autor', ResumeRecord: 'Breve resumen', LinkRecord: 'vínculo de consulta', NumberQuotes: 'Total de Citas', ResearchContribute: 'Aportes' },
    ]

    return (
        <>
            <DataGrid
                sx={{ mb: 3 }}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    }
                }}
                pageSizeOptions={[5, 10]}
            />
        </>
    )
}
