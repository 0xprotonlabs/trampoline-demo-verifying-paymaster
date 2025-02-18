import {
  Box,
  Button,
  CardActions,
  CardContent,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  PreTransactionConfirmation,
  PreTransactionConfirmationtProps,
} from '../types';

const AddPaymasterAndData = ({
  setPaymasterAndData,
}: {
  setPaymasterAndData: (paymasterAndData: string) => void;
}) => {
  const [showAddPaymasterUI, setShowAddPaymasterUI] = useState<boolean>(false);
  const [addPaymasterLoader, setAddPaymasterLoader] = useState<boolean>(false);
  const [paymasterAndData, setPaymasterAndDataLocal] = useState<string>('');

  const addPaymaster = useCallback(async () => {
    setAddPaymasterLoader(true);
    setPaymasterAndData(paymasterAndData);
    setAddPaymasterLoader(false);
    setShowAddPaymasterUI(false);
  }, [paymasterAndData, setPaymasterAndData]);

  return (
    <>
      <Typography variant="h6" sx-={{ p: 2 }}>
        Paymaster Info
      </Typography>
      {!showAddPaymasterUI && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Paymaster data
          </Typography>
          <Typography
            component="div"
            variant="caption"
            style={{ overflowWrap: 'anywhere' }}
          >
            {paymasterAndData || '0x'}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            onClick={() => setShowAddPaymasterUI(true)}
            variant="outlined"
          >
            {paymasterAndData ? 'Change paymaster data' : 'Add paymaster data'}
          </Button>
        </Paper>
      )}
      {showAddPaymasterUI && (
        <Paper sx={{ p: 2 }}>
          <TextField
            value={paymasterAndData}
            onChange={(e) => setPaymasterAndDataLocal(e.target.value)}
            sx={{ width: '100%' }}
            label="Paymaster And Data"
            variant="standard"
            autoFocus
          />
          <Box
            justifyContent="space-around"
            alignItems="center"
            display="flex"
            sx={{ p: '16px 0px' }}
          >
            <Button
              sx={{ width: 150 }}
              variant="outlined"
              onClick={() => {
                setShowAddPaymasterUI(false);
                setAddPaymasterLoader(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={addPaymasterLoader}
              sx={{ width: 150, position: 'relative' }}
              variant="contained"
              onClick={addPaymaster}
            >
              Add
              {addPaymasterLoader && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

const PreTransactionConfirmationComponent: PreTransactionConfirmation = ({
  onComplete,
  transaction,
  onReject,
}: PreTransactionConfirmationtProps) => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [paymasterAndData, setPaymasterAndDataLocal] = useState<string>('');

  return (
    <>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Paymaster Demo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We will be using{' '}
          <a href="https://docs.stackup.sh/docs/paymaster-api-rpc-methods">
            Stackup's paymaster
          </a>{' '}
          as our paymaster for the purpose of this demo.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          File name:
        </Typography>
        <Typography variant="caption">
          trampoline/src/pages/Account/components/transaction/pre-transaction-confirmation.ts
        </Typography>
      </CardContent>
      <CardActions sx={{ width: '100%' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            disabled={loader}
            size="large"
            variant="contained"
            onClick={() => {
              onComplete(transaction, { paymasterAndData });
              setLoader(true);
            }}
          >
            Continue
            {loader && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Button>
        </Stack>
      </CardActions>
    </>
  );
};

export default PreTransactionConfirmationComponent;
