
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, alpha, styled } from '@mui/material';
import { useState } from 'react';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' ? alpha(theme.palette.common.black, 0.25) : alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? alpha('#FF7722', 3) : alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  interface SearchInputPRops {
    query :  string,
    setQuery : (value:string)=> void
  }
const SearchInput =({query,setQuery}:SearchInputPRops)=>{
    const [searchQuery, setSearchQuery] = useState(query);
    const onSearchQueryChange = (value: string) => {
        setSearchQuery(value);
        setQuery(value);
      }
    return (
        <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="येथे एंटर करा..."
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
        />
      </Search>
    )
}

export default SearchInput;