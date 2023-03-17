import { useState } from 'react';
import PropTypes from 'prop-types';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Stack,
  Card,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
// components
import { addSocialLink } from '../../../redux/slices/accountSlice';
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider from '../../../components/hook-form';


// const addSocialLink = require('redux/slices/account')

// src/hoge/moge.js by writing const moge = require('hoge/moge');
// ----------------------------------------------------------------------

// const SOCIAL_LINKS = [
//   {
//     value: 'facebookLink',
//     icon: <Iconify icon="eva:facebook-fill" width={24} />,
//   },
//   {
//     value: 'instagramLink',
//     icon: <Iconify icon="ant-design:instagram-filled" width={24} />,
//   },
//   {
//     value: 'linkedinLink',
//     icon: <Iconify icon="eva:linkedin-fill" width={24} />,
//   },
//   {
//     value: 'twitterLink',
//     icon: <Iconify icon="eva:twitter-fill" width={24} />,
//   },
// ];

// ----------------------------------------------------------------------

AccountSocialLinks.propTypes = {
  socialLinks: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    linkedinLink: PropTypes.string,
    twitterLink: PropTypes.string,
  }),
};

export default function AccountSocialLinks({ socialLinks }) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    facebookLink: socialLinks.facebookLink,
    instagramLink: socialLinks.instagramLink,
    linkedinLink: socialLinks.linkedinLink,
    twitterLink: socialLinks.twitterLink,
  };

  const methods = useForm({
    defaultValues,
  });

  const dispatch = useDispatch()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const socialLinksState = useSelector(state => state.accountSlice.socialLinksList)

  const [socialLinksList, setSocialLinksList] = useState(socialLinksState)

  const [isActiveSelect, setIsActiveSelect] = useState(false);

  const addMoreSocialLink = () => {
    setIsActiveSelect(true)
  };

  const handleInputChange = (event) => {
    setSocialLinksList([...socialLinksList.map(item => item.id === event.target.id ? {...item, url: event.target.value} : item)])
    console.log(socialLinksList)
  }

  const handleSelectFunc = (e) => {
    setIsActiveSelect(false)
    if (e.target.value === 'https://www.facebook.com/') {
      setSocialLinksList([...socialLinksList, {id: (Math.random() * new Date).toFixed().toString(), url: e.target.value, icon: <Iconify icon="eva:facebook-fill" width={24} />}] )
    } else if (e.target.value === 'https://www.instagram.com/') {
    setSocialLinksList([...socialLinksList, {id: (Math.random() * new Date).toFixed().toString(), url: e.target.value, icon: <Iconify icon="ant-design:instagram-filled" width={24} />}] )
    } else if (e.target.value === 'https://www.twitter.com/') {
      setSocialLinksList([...socialLinksList, {id: (Math.random() * new Date).toFixed().toString(), url: e.target.value, icon: <Iconify icon="eva:twitter-fill" width={24} />}] )
    } else {
      setSocialLinksList([...socialLinksList, {id: (Math.random() * new Date).toFixed().toString(), url: e.target.value, icon: <Iconify icon="eva:linkedin-fill" width={24} />}] )
    }
  } 

  const handleSaveChange = () => {
    dispatch(addSocialLink(socialLinksList))
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-end">
          {/* {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>,
              }}
            />
          ))} */}
          <Box sx={{width: '100%'}}>
            {socialLinksList.map((item) => (<TextField
    id={item.id}
    defaultValue={item.url}
    variant="outlined"
    onChange={handleInputChange}
    InputProps={{
      startAdornment: <InputAdornment position="start">{item.icon}</InputAdornment>,
    }}
    sx={{width: '100%', mb: '20px'}}/>))}
          </Box>
          <FormControl fullWidth style={{display: `${isActiveSelect ? 'block' : 'none'}`}}>
            <InputLabel id="demo-simple-select-label">Social link</InputLabel>
            <Select
              style={{width: '100%'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleSelectFunc}
              label="SocialLink"
            >
              <MenuItem value='https://www.facebook.com/'>Facebook</MenuItem>
              <MenuItem value='https://www.instagram.com/'>Instagram</MenuItem>
              <MenuItem value='https://www.linkedin.com/in/'>Linkedin</MenuItem>
              <MenuItem value='https://www.twitter.com/'>Twitter</MenuItem>
            </Select>
          </FormControl>
          
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button size="medium" variant="outlined" onClick={addMoreSocialLink}>
            Добавить еще
          </Button>
          <LoadingButton onClick={handleSaveChange} type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
          </div>
        </Stack>
      </Card>
    </FormProvider>
  );
}
