import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { Card } from '../../components';
import { getApprovalList } from '../../store/actions/AdActions';


const Approval = ({getApprovalList, adList}) => {

  useEffect(() => {
    if(!adList){
      getApprovalList()
    }
  },[getApprovalList, adList])

  const FormRow = () => {
    return (
      <React.Fragment>
        {(adList) ? adList.map((ad,key) => {
          return (
            <Grid key={key} item xl={3} lg={4} md={6} sm={12}>
              <Card type={`approval`} ad={ad}/>
            </Grid>
          )  
        }): <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}><CircularProgress/></div>}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  adList: state.ad.approvalList
})

export default connect(mapStateToProps, {getApprovalList})(Approval);