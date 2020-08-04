import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Modal, Backdrop, Grid, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Maps } from '../../components';
import { getById, deleteAd, getCurrentCords, getUserInfo } from '../../store/actions/AdActions';
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    height: '350px'
  },
  media: {
    height: 300,
    width: '100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ItemModal = (props) => {
  const { getById, ad, match, cords, deleteAd, getCurrentCords, getUserInfo, bidder, seller } = props;
  const classes = useStyles();

  useEffect(() => {
    if (!ad) {
      getById(match.params.id)
      getCurrentCords(match.params.id)
    }
  }, [getById, ad])

  useEffect(() => {
    if (ad && !seller) {
      getUserInfo(ad.sellerId, "seller")
      if (ad.adType === "Bid") {
        getUserInfo(ad.bidder_id, "bidder")
      }
    }
  })

  console.log(props)
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={true}
      onClose={() => { props.history.goBack() }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={{ width: '50vw', backgroundColor: 'white' }}>
        {(!ad) ?
          <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}><CircularProgress /></div> :
          <div style={{ width: '60vw', backgroundColor: '#fff' }}>
            <div style={{ width: "100%", textAlign: 'center' }}>
              <Carousel className={classes.media}>
                {ad.imageLinks.map((img, key) => {
                  return <img height={'200px'} width='auto' key={key} src={img} alt="ad_img" />
                })}
              </Carousel>
            </div>
            <div style={{ padding: '2rem', paddingTop: '0' }}>
              <Grid container spacing={1}>
                <Grid container item xs={(cords) ? 6 : 12} spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">{ad.title}</Typography>
                  </Grid>
                  <Grid item container xs={8}>
                    <Grid item xs={6}>
                      <Typography variant="h5" color={'primary'} component="p">Rs. {ad.price}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" style={{ color: 'green' }} component="p">{ad.adType}</Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <p><span style={{ color: 'blue', fontSize: 18 }}>Category: </span>{ad.category}</p>
                    <p><span style={{ color: 'blue', fontSize: 18 }}>Seller Contact: </span>{(seller) ? seller.contact : ""}</p>
                    {(ad.adType === 'Bid' && ad.bidder_id !== "dummy") ?
                      <React.Fragment>
                        <p><span style={{ color: 'blue', fontSize: 18 }}>Bidder Contact: </span>{(bidder) ? bidder.contact : ""}</p>
                        <p><span style={{ color: 'blue', fontSize: 18 }}>Highest Bid: </span>{ad.max_offer}</p>
                      </React.Fragment> : null
                    }
                    {( ad.adType === 'Bid' && ad.bidder_id === "dummy") ?
                      <React.Fragment>
                        <p>No bidder yet</p>
                      </React.Fragment> : null
                    }
                    <p><span style={{ color: 'blue', fontSize: 18 }}>Specications: </span>{ad.adDesSpec}</p>
                  </Grid>
                </Grid>
                {cords ?
                  <Grid container item xs={6} spacing={3}>
                    <div style={{ height: 200, width: "100%" }}>
                      <Maps isMarkerShown cor={[{ lat: cords.latitude, long: cords.longitude }]} />
                    </div>
                  </Grid> : null
                }
                <Grid item xs={12}>
                  <Button onClick={() => { deleteAd(match.params.id); props.history.goBack() }} style={{ float: 'right' }} color="secondary">Delete Ad</Button>
                  {(ad.adType === "Bid" && bidder) ? 
                    <Button href={`tel:${bidder.contact}`} style={{ float: 'right' }} color="primary" >Contact Bidder</Button>: null
                  }
                </Grid>
              </Grid>
            </div>
          </div>
        }
      </div>
    </Modal>
  );
}

const mapStateToProps = state => ({
  ad: state.ad.selectedAd,
  cords: state.ad.cords,
  bidder: state.ad.bidder,
  seller: state.ad.seller
})

export default connect(mapStateToProps, {
  getById,
  deleteAd,
  getCurrentCords,
  getUserInfo
})(ItemModal);