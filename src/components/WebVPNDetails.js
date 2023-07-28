import React, { useState, useEffect } from 'react';
import { TextField, Grid, DialogTitle, DialogContent, DialogContentText, Typography, DialogActions, Button } from '@mui/material';

const WebVPNDetails = ({ data, closeDialog, handleCustomSchoolSubmit  }) => {
  const [editSchool, setEditSchool] = useState({});
  const [urlError, setUrlError] = useState(false);

  useEffect(() => {
    setEditSchool(data);
  }, [data]);

  const handleChange = (event) => {
    setEditSchool(prevSchool => ({ ...prevSchool, [event.target.name]: event.target.value }));
    if (event.target.name === 'url') {
      setUrlError(!event.target.value);
    }
  };

  const handleSubmit = () => {
    let customSchool = JSON.parse(localStorage.getItem('customSchool')) || {};
    if (editSchool.url !== data.url || editSchool.key !== data.key || editSchool.iv !== data.iv) {
      Object.assign(customSchool, { url: editSchool.url, key: editSchool.key, iv: editSchool.iv });
      localStorage.setItem('customSchool', JSON.stringify(customSchool));
    }
    handleCustomSchoolSubmit();
    closeDialog();
  };

  return (
    <div>
      <DialogTitle id="form-dialog-title">设置</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            请在下方输入 Web VPN 地址。<br />如果你不知道 KEY 和 IV 是什么，请留空。
          </Typography>
        </DialogContentText>
        <TextField
          label="学校 Web VPN 网络地址"
          value={editSchool?.url || ''}
          name="url"
          onChange={handleChange}
          variant="standard"
          fullWidth
          margin="normal"
          error={urlError}
          helperText={urlError ? "学校网址是必填项" : ""}
        />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="KEY"
              value={editSchool?.key || ''}
              name="key"
              onChange={handleChange}
              variant="standard"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="IV"
              value={editSchool?.iv || ''}
              name="iv"
              onChange={handleChange}
              variant="standard"
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <DialogContentText>
          <Typography variant="caption" >
            注: KEY 或 IV 留空 将使用默认值 <code>wrdvpnisthebest!</code>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">取消</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!editSchool.url}>保存</Button>
      </DialogActions>
    </div>
  );
};

export default WebVPNDetails;
