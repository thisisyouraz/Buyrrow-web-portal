import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { Card, ItemModal } from '../../components';
import { getAllAds } from '../../store/actions/AdActions';
import { Route } from 'react-router-dom';

const DashBoard = ({getAllAds, adList}) => {

  useEffect(() => {
    if(!adList){
      getAllAds()
    }
  },[getAllAds, adList])

  const FormRow = () => {
    return (
      <React.Fragment>
        {(adList) ? adList.map((ad,key) => {
          return (
            <Grid key={key} item xl={3} lg={4} md={6} sm={12} xs={12}>
              <Card ad={ad}/>
            </Grid>
          )  
        }): <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}><CircularProgress/></div>}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid style={{ width: '100%' }} container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
      <Route path={'/dashboard/ad/:id'} component={ItemModal}/>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  adList: state.ad.adList
})

export default connect(mapStateToProps, {getAllAds})(DashBoard);