
import { IContentTypeList } from '@abhang/app/types/IContentType';
import { IRelatedData } from '@abhang/app/types/IRelatedData';
import { ISant, ISantList } from '@abhang/app/types/ISant';
import API_ENDPOINTS from '@abhang/app/utils/api-endpoints';
import { apiCall } from '@abhang/app/utils/fetch';
import HELPERS from '@abhang/app/utils/helper';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Button, Card, Chip, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageWithLoader from '@abhang/app/comps/loading/image-loader';

interface OurFeatureComponentProps {
  sants: ISantList;
  aratis: IContentTypeList,
  granths: IContentTypeList,
  kadambari: IContentTypeList
  loading: boolean;
}

const initialValue: OurFeatureComponentProps = {
  sants: [],
  aratis: [],
  granths: [],
  kadambari: [],
  loading: true
}

const items = [
  {
    icon: <PeopleAltIcon />,
    title: 'संत',
    description:
      'महाराष्ट्राला संतांची पुरातन परंपरा आहे. या संतांनी महाराष्ट्राला व मराठी भाषेला वाङ्मयाचा मोठा वारसा दिला आहे. ',
    click: "/sant"
  },
  {
    icon: <DescriptionIcon />,
    title: 'आरती',
    description:
      'संपूर्ण आरती संग्रह मराठी या मध्ये तुम्हाला सर्व देवी देवतांच्या प्रमुख आरत्या मराठी मध्ये मिळतील त्या खालील प्रमाणे.',
    click: "/articals/aratis"
  },
  {
    icon: <ImportContactsIcon />,
    title: 'ग्रंथ',
    description: 'आमच्या संग्रहात तुम्हाला मराठीतील ग्रंथांची विशेष संग्रहात सांगता मिळेल.',
    click: "/articals/grnth"
  },
  {
    icon: <StarRateIcon />,
    title: 'कादंबरी',
    description: 'आमच्या संग्रहात तुम्हाला मराठीतील कादंबर्यांची संगती मिळेल.',
    click: "/articals/kadambari"
  },
];

const OurFeatureComponent = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [page, setPage] = useState<OurFeatureComponentProps>(initialValue);
  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        await Promise.all([
          await getRelatedData(),
        ]).then((value: [IRelatedData]) => {
          setPage(prevState => ({
            ...prevState,
            sants: value[0].sants,
            aratis: value[0].aratis,
            granths: value[0].granths,
            kadambari: value[0].kadambaris,

          }));
        }).finally(() => {
          setPage(prevState => ({
            ...prevState,
            loading: false
          }))
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const getRelatedData = async (): Promise<IRelatedData> => {
    const { Data } = await apiCall<IRelatedData>(`${API_ENDPOINTS.GET_ENTITY_TYPEDATA}`, 'POST', {
      "pageNumber": 0,
      "pageSize": 0,
      "parms": [
        {
          "key": HELPERS.ApiEntityType.sants,
          "value": HELPERS.ApiEntityType.sants,
          "recoredCount": 15
        },
        {
          "key": HELPERS.ApiEntityType.arati,
          "value": HELPERS.ApiEntityType.arati,
          "recoredCount": 15
        },
        {
          "key": HELPERS.ApiEntityType.grnth,
          "value": HELPERS.ApiEntityType.grnth,
          "recoredCount": 15
        },
        {
          "key": HELPERS.ApiEntityType.kadambari,
          "value": HELPERS.ApiEntityType.kadambari,
          "recoredCount": 15
        },

      ]
    });

    return Data;
  }
  const selectedFeature = items[selectedItemIndex];

  const AratiGrid = () => {
    return (
      <>{items[selectedItemIndex].title === 'आरती' &&
        <Grid
          paddingTop={5}
          container
          spacing={2}
          xs={12}
          textAlign={'center'}
        >
          {page?.aratis?.map((sant, santIndex) => (
            <Grid key={`${sant.urlId}-${santIndex}-arati-grid`} item xs={4} md={3}>
              <Link
                style={{ textDecoration: 'none' }}
                href={sant.click}
              >
                 <ImageWithLoader alt={sant?.document?.name}
                  title={sant?.document?.name} src={`${HELPERS.getDocUrl(sant?.document?.url)}`}
                  width={80}
                  height={80} />
              </Link>
            </Grid>
          ))}
        </Grid>

      }
      </>
    )
  };

  const GranthGrid = () => {
    return (
      <>{items[selectedItemIndex].title === 'ग्रंथ' &&
        <Grid
          paddingTop={5}
          container
          spacing={2}
          xs={12}
          textAlign={'center'}
        >
          {page?.granths?.map((granth, santIndex) => (
            <Grid key={`${granth?.urlId}-${santIndex}-granth-grid`} item xs={4} md={3}>
              <Link
                style={{ textDecoration: 'none' }}
                href={granth.click}
              >
                 <ImageWithLoader alt={granth?.document?.name}
                  title={granth?.document?.name} src={`${HELPERS.getDocUrl(granth?.document?.url)}`}
                  width={80}
                  height={80} />
              </Link>
            </Grid>
          ))}
        </Grid>

      }
      </>
    )
  };

  const KadambariGrid = () => {
    return (
      <>{items[selectedItemIndex].title === 'कादंबरी' &&
        <Grid
          paddingTop={5}
          container
          spacing={2}
          xs={12}
          textAlign={'center'}
        >
          {page?.kadambari?.map((kadambari, santIndex) => (
            <Grid key={`${kadambari?.urlId}-${santIndex}-kadambari-grid`} item xs={4} md={3}>
              <Link
                style={{ textDecoration: 'none' }}
                href={kadambari.click}
              >
                <ImageWithLoader alt={kadambari?.document?.name}
                  title={kadambari?.document?.name} src={`${HELPERS.getDocUrl(kadambari?.document?.url)}`}
                  width={80}
                  height={80} />
              </Link>
            </Grid>
          ))}
        </Grid>

      }
      </>
    )
  };


  const SantGrid = () => {
    return (
      <>{items[selectedItemIndex].title === 'संत' &&
        <Grid
          paddingTop={5}
          container
          spacing={2}
          xs={12}
          textAlign={'center'}
        >
          {page?.sants?.map((sant, santIndex) => (

            <Grid key={`${sant?.urlId}-${santIndex}-sant-grid`} item xs={4} md={3}>
              <Link

                href={sant.click}
                key={`${sant.name}-sant-link`}
              >
                <ImageWithLoader alt={sant?.document?.name}
                  title={sant?.document?.name} src={`${HELPERS.getDocUrl(sant?.document?.url)}`}
                  width={80}
                  height={80} />
              </Link>
            </Grid>

          ))}
        </Grid>

      }
      </>
    )
  };

  const LoadFeatureData = () => {
    return (
      <>
        <SantGrid />
        <AratiGrid />
        <GranthGrid />
        <KadambariGrid />
      </>
    )
  }
  return (
    <>
      {page.loading ? <Skeleton variant="rectangular" width={'100%'} height={500} /> :
        <Grid container spacing={6} marginTop={1}  >
          <Grid item xs={12} md={6}>
            <div>
              <Typography component="h2" variant="h4" color="text.primary">
                लेटेस्ट अपडेट्स
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 4 } }}
              >
                आमच्या संग्रहातून तुम्हाला मराठीतील विशेष साहित्याच्या अनेक आवृत्तियां मिळतात.आमच्या पोर्टलवर तुम्हाला ग्रंथ, संत कविता, कादंबरी, आणि आरत्या समाविष्ट आहेत. हे सर्व सामाजिक, धार्मिक, आणि सांस्कृतिक दृष्टिकोनातून समृद्ध करण्यासाठी आम्ही समर्थ आहोत .
              </Typography>
            </div>
            <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
              {items?.map(({ title }, index) => (
                <Chip
                  key={index}
                  label={title}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'primary.light' : '';
                      }
                      return selectedItemIndex === index ? 'primary.light' : '';
                    },
                    background: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index ? 'none' : '';
                      }
                      return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                    '& .MuiChip-label': {
                      color: selectedItemIndex === index ? '#fff' : '',
                    },
                  }}
                />
              ))}
            </Grid>
            <Box
              component={Card}
              variant="outlined"
              sx={{
                display: { xs: 'auto', sm: 'none' },
                mt: 4,
              }}
            >
              <Box sx={{ px: 2, pb: 2, pt: 2 }} id={"sachin"}>
                <Typography color="text.primary" variant="body2" fontWeight="bold">
                  {selectedFeature.title}
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                  {selectedFeature.description}
                </Typography>
                <Link
                  color="primary"
                  href={selectedFeature.click}
                  //variant="body2"
                  //fontWeight="bold",
                  style={{

                    display: 'inline-flex',
                    alignItems: 'center',
                    // '& > svg': { transition: '0.2s' },
                    // '&:hover > svg': { transform: 'translateX(2px)' },
                  }}
                >
                  <span>अजून पहा </span>
                  <ChevronRightRoundedIcon
                    fontSize="small"
                    sx={{ mt: '1px', ml: '2px' }}
                  />
                </Link>
                <Divider style={{ paddingTop: 10 }} />
                <LoadFeatureData />
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              useFlexGap
              sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
            >
              {items?.map(({ icon, title, description }, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    backgroundColor:
                      selectedItemIndex === index ? 'action.selected' : undefined,
                    borderColor: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? 'primary.light'
                          : 'grey.200';
                      }
                      return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      textAlign: 'left',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { md: 'center' },
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === 'light') {
                            return selectedItemIndex === index
                              ? 'primary.main'
                              : 'grey.300';
                          }
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.700';
                        },
                      }}
                    >
                      {icon}
                    </Box>
                    <Box sx={{ textTransform: 'none' }}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                      >
                        {title}
                      </Typography>
                      <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ my: 0.5 }}
                      >
                        {description}
                      </Typography>
                      <Link
                        color="primary"
                        href={selectedFeature.click}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>अजून पहा </span>
                        <ChevronRightRoundedIcon
                          fontSize="small"
                          sx={{ mt: '1px', ml: '2px' }}
                        />
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: { xs: 'none', sm: 'flex' }, width: '100%',
            }}

          >
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
                pointerEvents: 'none',
              }}

            >
              {/* <LoadFeatureData /> */}
              <Box
                sx={{
                  m: 'auto',
                  width: 420,
                  height: 500,
                }}
              >
                <LoadFeatureData />

              </Box>
            </Card>
          </Grid>
        </Grid>
      }
    </>

  )
}
export default OurFeatureComponent;