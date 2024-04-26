import { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import CheckIcon from '@mui/icons-material/Check'
import { listFAQ } from '../../config/assets'
import CustomButton from '../CustomButton'

const AccordionG = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
}));

const AccordionSumm = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIcon': {
    transform: 'rotate(90deg)',
  },
  marginTop: theme.spacing(1),
}));

const AccordionDet = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid rgba(0, 0, 0, .125)`,
}));

export default function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
    <Box sx={{ width: "100%", backgroundColor: "rgba(0,0,0,0.1)", py:"5em", mt: "2em" }}>
      <Box id="faq" sx={{ width: {xs: "100%", md: "70%"}, margin: "0 auto" }}>
        <Typography variant="h3" component="h2" align="center" color="secondary" sx={{ my: 2, fontWeight: "600" }}>Preguntas Frecuentes</Typography>

        {listFAQ.map((item, index) => (
            <AccordionG key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
              <AccordionSumm
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
                expandIcon={<ArrowForwardIosSharpIcon />}
              >
                <Typography variant="h6" component="h5" color="primary" sx={{ fontWeight: "600" }}>
                  {item.question}
                </Typography>
              </AccordionSumm>
              <AccordionDet>
                {item.answer.map((ans, j) => (
                  <Box key={j}>
                    <List>
                      <ListItem disablePadding>
                        <ListItemIcon><CheckIcon /></ListItemIcon>
                        <ListItemText primary={ans} />
                      </ListItem>
                    </List>
                  </Box>
                ))}
              </AccordionDet>
            </AccordionG>
        ))}
      </Box>
      <Grid container sx={{ width: "100%", mt: 5 }}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <CustomButton name="Iniciar Sesión" anchor="/login" color="#000" txtHovColor="#000" />
            </Grid>
        </Grid>
    </Box>
    </>
  );
}
