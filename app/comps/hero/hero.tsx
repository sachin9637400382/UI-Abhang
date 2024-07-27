"use client";
import * as React from 'react';
import { Skeleton, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface HeroProps {
  loading: boolean,
  title: string;
  subTitle: string;
  isSearchEnable?: boolean;
  searchQuery?: string;
  updateSearchQuery?: (serchQuery: string) => void

}
export default function Hero({ loading = false, title = "", subTitle = "", isSearchEnable = false, searchQuery = "", updateSearchQuery }: HeroProps) {
  const [query, setQuery] = React.useState("");

  const onQueryChang = (value: string) => {
    if (updateSearchQuery) {
      setQuery(value);
      updateSearchQuery(value);
    }
  }
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #fdeece, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        paddingBottom: '2px',
        zIndex: 200,
        position: 'relative'
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 10, sm: 15 },
          pb: { xs: 1, sm: 1 },
        }}
      >

        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          {loading ? <Skeleton variant="text" sx={{ fontSize: '4rem' }} /> :
            <>
              <Typography
                variant="h1"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 'clamp(2rem, 6vw, 3rem)',
                }}
              >
                {title}&nbsp;
                <Typography
                  component="span"
                  variant="h1"
                  sx={{
                    fontSize: 'clamp(2rem, 6vw, 3rem)',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                  }}
                >
                  {subTitle}
                </Typography>
              </Typography>
              {isSearchEnable === true && updateSearchQuery && <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
              >
                <TextField
                  id="outlined-basic"
                  value={query}
                  onChange={async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onQueryChang(event.target.value)}
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  aria-label=" एंटर करा.."
                  placeholder=" एंटर करा.."
                  inputProps={{
                    autoComplete: 'off',
                    //ariaLabel: ' एंटर करा..',
                  }}
                />
                <Button variant="contained" color="primary" onClick={() => onQueryChang("")}>
                  हटवा
                </Button>
              </Stack>
              }
            </>
          }
        </Stack>

      </Container>
    </Box>
  );
}