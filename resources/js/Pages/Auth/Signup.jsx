
import { Head ,router } from "@inertiajs/react";

import Layout from "../Layout";
import { useForm } from "react-hook-form";
import {  IconButton, InputAdornment, Grid2, Button } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid22";
// import Inertia from '@inertiajs/react';
import ControlMUItextField from "../../Component/HOC/MUI/ControlMUItextField";
import MUItextField from "../../Component/HOC/MUI/MUItextField";
import { useTranslation } from "react-i18next";
import { useState } from "react";
// import {
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";


export default function SignUp({csrf_token}) {
    const {
        handleSubmit,
        register,
        control,
        setValue,
        unregister,
        setError,
        formState,
        getValues,
        watch,
      } = useForm();

      console.log(csrf_token);
      
      const { errors } = formState;
      const onSubmit = (data) => {
        console.log(data);
        console.log(data);
        
        router.post('/signup', data);
  
     
      };
      const { t } = useTranslation();
    //   const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [ConShowPassword, ConSetShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleClickConShowPassword = () => {
      ConSetShowPassword(!ConShowPassword);
    };
    return (
        <Layout>
            <Head title="Welcome" />
            <h1>Welcome</h1>
           
            <form onSubmit={handleSubmit(onSubmit)}>
         <MUItextField type="hidden" register={register}  errors={errors}  name="_token"  label={t("token")} defaultValue={csrf_token}/>
            
              <Grid2 container spacing={2}>

               <Grid2   size={{ xs: 12, md: 6}}>
               <MUItextField
                margin="dense"
                name={"name"}
                label={t("name")}
                register={register}
                formType={"requireFalse"}
                errors={errors}
              />
            
            </Grid2> 
          
            <Grid2 size={{ xs: 12, md: 6}}>
              <MUItextField
                margin="dense"
                name={"email"}
                label={t("email")}
                register={register}
                errors={errors}
                formType={"pattern"}
                formVal={{
                  value:
                    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t("emailIsInvalid"),
                }}
              />
            </Grid2> 
           
            <Grid2  size={{ xs: 12, md: 6}}>
            <MUItextField
                margin="dense"
                name={"password"}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        size="large"
                      >
                        {showPassword ? "s":"h"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label={t("password")}
                register={register}
                errors={errors}
              />
            </Grid2> 
            <Grid2  size={{ xs: 12, md: 6}}>
            <MUItextField
                margin="dense"
                name={"confirmPassword"}
                type={ConShowPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickConShowPassword}
                        size="large"
                      >
                        {ConShowPassword ? "s":"h"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label={t("password")}
                register={register}
                errors={errors}
              />
            </Grid2> 
            </Grid2>

            <Button
              
                size="large"
                fullWidth
                variant="contained"
                color="primary"
               
                type="submit"
              >
                {t("createNewAccount")}
              </Button>

</form>

       

       
          
       
      
        </Layout>
    );
}
