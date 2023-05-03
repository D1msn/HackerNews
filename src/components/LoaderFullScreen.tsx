import { Box, CircularProgress, Container } from '@mui/material'
import React from 'react'

export const LoaderFullScreen = () => (
    <Container>
        <Box
            minHeight={'100vh'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <CircularProgress size={35} />
        </Box>
    </Container>
)
