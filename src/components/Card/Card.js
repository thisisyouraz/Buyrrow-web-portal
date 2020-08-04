import React from 'react';
import { Button, Typography , Card, CardActionArea, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearSelectedAd, approve, rejectAd } from '../../store/actions/AdActions';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    height: '350px'
  },
  media: {
    height: 200,
    width: 'auto',
    alignSelf: 'center'
  },
});

const _Card = ({ad, type, clearSelectedAd, approve, rejectAd}) => {
  const classes = useStyles();
  return ( 
    <Card className={classes.root}>
      <CardActionArea>
        <Carousel autoPlay={false} className={classes.media}>
          {ad.imageLinks.map((img,key) => {
            return <img height={'200px'} width={'auto'} key={key} src={img} alt="ad_img"/>
          })}
        </Carousel>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {ad.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {ad.price}
        </Typography>
      </CardContent>
      <CardActions>
        {(type && type === 'approval') ? 
        <React.Fragment>
          <Button onClick={() => approve(ad.parentID)} size="small" color="primary">
            Approve
          </Button>
          <Button onClick={() => rejectAd(ad.parentID)} size="small" color="secondary">
            Decline
          </Button>
        </React.Fragment>:  
        <Button size="small" color="primary" onClick={() => clearSelectedAd()}>
          <Link to={`/dashboard/ad/${ad.parentID}`}> 
            View
          </Link>
        </Button>
        }
      </CardActions>
    </Card>
  );
}
 
export default connect(null, {clearSelectedAd, approve, rejectAd})(_Card);