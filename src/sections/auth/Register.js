// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <LoginLayout title="Давай к нам кодер!">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Зарегистрироваться в FatCode</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Уже есть аккаунт? </Typography>

          <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
            Войти
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {'Регистрируясь, я соглашаюсь на '}
        <Link underline="always" color="text.primary">
          условия
        </Link>
        .
      </Typography>

      <AuthWithSocial />
    </LoginLayout>
  );
}
