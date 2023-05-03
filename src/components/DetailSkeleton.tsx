import {Box, Container, Skeleton} from "@mui/material";

export const DetailSkeleton = () => {
    return (
        <Container>
            <Box display={'flex'} justifyContent={'space-between'} pt={2} mb={3}>
                <Skeleton variant={'rounded'} width={'100px'} height={'36px'}/>
                <Skeleton variant={'rounded'} width={'100px'} height={'36px'}/>
            </Box>
            <Skeleton animation={'wave'} sx={{mb: 2}} variant={'rectangular'} height={'300px'} />
            <Skeleton animation={'wave'} variant={'rectangular'} height={'50px'} />
        </Container>
    )
}
