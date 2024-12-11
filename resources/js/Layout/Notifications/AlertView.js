import * as React from 'react';
import * as gqlb from "gql-query-builder";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import config from '../../config.json';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Rating } from 'react-simple-star-rating';
import SpanLink from '../../Component/HOC/CustomComponents/SpanLink';
import { TbStars } from "react-icons/tb";
import { gql, useQuery } from "@apollo/client";
import FullScreenLoading from '../../Component/HOC/FunctionComponents/LoadingPages/FullScreenLoading';
import { useTranslation } from 'react-i18next';

const PREFIX = 'AgentReviewContent';

const classes = {
  textCenter: `${PREFIX}-textCenter`,
  link: `${PREFIX}-link`,
};

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(3, 2),
  [`& .${classes.textCenter}`]: {
    textAlign: "center",
  },
  [`& .${classes.link}`]: {
    fontSize: "18px"
  },
}));


const DELIVERY_AGENT_REVIEW_ID = gqlb.query({
  operation: "deliveryAgentReview",
  fields: [
    "id",
    "notes",
    {
      shipment: [
        "id",
        "code"
      ]
    },
    {
      deliveryAgent: [
        "id",
        "name"
      ]
    },
    "notes",
    "rate",
    "createdAt",
  ],
  variables: {
    id: {
      type: "Int",
      required: true,
    },
  },
});

function AlertViewContent(props) {
  const { data } = props
  const NotificationData = JSON.parse(data.data);
  let getBackendUri = (imgPath) => {
    const domain = config.backend.domain
      ? config.backend.domain
      : window.location.hostname;

    return `${config.backend.protocol}://${domain}:${config.backend.port}/${imgPath}`;
  };
  return (
    <Card sx={{ overflowY: "auto" }}>
      <CardHeader
        title={NotificationData.title}
        subheader={data.createdAt.split(" ")[0] + ' - ' + data.createdAt.split(" ")[1]}
      />
      {NotificationData.image && <CardMedia
        component="img"
        // height="194"
        image={getBackendUri(NotificationData.image)}
        alt="Paella dish"
      />}
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {NotificationData.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

function AgentReviewContent(props) {
  const { t } = useTranslation();
  const { data } = props
  const NotificationData = JSON.parse(data.data);

  const { loading, data: reviewDataQuery } = useQuery(
    gql`
      ${DELIVERY_AGENT_REVIEW_ID.query}
    `,
    {
      fetchPolicy: "network-only",
      variables: { id: parseInt(NotificationData.id) },
    }
  );
  const reviewData = reviewDataQuery?.deliveryAgentReview

  return (
    <Root paddingX={2} paddingY={4}>
      {loading ? <FullScreenLoading /> :
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid xs={12} md={12} className={classes.textCenter}>
            <TbStars size={80} color='gray' />
          </Grid>
          <Grid xs={12} md={12}>
            <Typography variant='h5' textTransform={"capitalize"} color={"text.primary"} className={classes.textCenter}>{t("agentReview")}</Typography>
          </Grid>
          <Grid xs={12} md={12} className={classes.textCenter}>
            <Rating
              // onClick={handleRating}
              initialValue={reviewData.rate}
              size={30}
              label
              transition
              fillColor='orange'
              emptyColor='gray'
              className={'foo'}
              allowFraction
              readonly={true}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography sx={{ mr: 1 }}>{t("theShipment")} :</Typography>
              <SpanLink
                className={classes.link}
                pathname={`/admin/branches/2`}
              >
                {reviewData.shipment.code}
              </SpanLink>
            </Box>
          </Grid>
          <Grid xs={12} md={12}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography sx={{ mr: 1 }}>{t("agent")} :</Typography>
              <SpanLink
                className={classes.link}
                pathname={`/admin/branches/2`}
              >
                {reviewData.deliveryAgent.name}
              </SpanLink>
            </Box>
          </Grid>
          <Grid xs={12} md={12}>
            <Typography variant='body1' color={"text.primary"}>
              {reviewData.notes}
            </Typography>
          </Grid>
        </Grid>}
    </Root >
  );
}

export default function AlertView(props) {
  const { data, dialogType } = props

  let content
  if (dialogType === "alert") {
    content = (<AlertViewContent data={data} />)
  }
  if (dialogType === "review") {
    content = (<AgentReviewContent data={data} />)
  }
  return (
    content
  );
}
