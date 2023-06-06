import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styled from "@emotion/styled";
import { ArrowForwardIosRounded } from "@mui/icons-material";
/**
 * @param {Object} props
 * @param {Object} props.job
 * @param {string} props.job._index The index of the job
 * @param {string} props.job._id The ID of the job
 * @param {number} props.job._score The score of the job
 * @param {string[]} props.job._ignored The ignored fields of the job
 * @param {Object} props.job._source The source of the job
 * @param {string} props.job._source.title The title of the job
 * @param {string} props.job._source.company The company of the job
 * @param {string} props.job._source.location The location of the job
 * @param {string} props.job._source.date The date of the job
 * @param {number} props.job._source.expire The expire date of the job
 * @param {string} props.job._source.salary The salary of the job
 * @param {string[]} props.job._source.benefits The benefits of the job
 * @param {string} props.job._source.url The URL of the job
 * @param {string} props.job._source.description The description of the job
 *
 */
export default function JobCard({ job }) {
  const matches = useMediaQuery("(min-width:1200px)", { noSsr: true });
  return (
    <Box
      sx={{
        backgroundColor: "rgba(25,25,45,0.9)",
        borderRadius: "30px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        paddingX: "40px",
        paddingY: "20px",
        position: "relative",
      }}
    >
      <CardHeader
        component={Link}
        href={job._source.url}
        title={job._source.title}
        target="blank"
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <Typography variant="body1">
          <strong>Công ty :</strong> {job._source.company}
        </Typography>
        <Typography variant="body1">
          <strong>Vị trí :</strong> {job._source.location}
        </Typography>
        <Typography variant="body1">
          <strong>Cập nhật :</strong>{" "}
          {new Date(job._source.date).toLocaleDateString()} - Bạn còn{" "}
          <strong>{job._source.expire}</strong> ngày để ứng tuyển
        </Typography>

        <Typography
          sx={{
            position: matches ? "absolute" : "static",
            right: "30px",
            top: "30px",
          }}
          color="lightblue"
          variant="body1"
        >
          <strong> {job._source.salary}</strong>
        </Typography>
        <Stack direction="row" spacing={1} padding={1.5}>
          {job._source.benefits.map((benefit, index) => {
            return <Chip key={index} label={benefit} variant="filled" />;
          })}
        </Stack>

        <Accordion backgroundcolor="red">
          <AccordionSummary>{"Mô tả"}</AccordionSummary>
          <AccordionDetails>
            <Typography whiteSpace="pre-wrap" variant="body1">
              {job._source.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Box>
  );
}
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, .2)"
      : "rgba(255, 255, 255, .09)",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosRounded sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, .2)"
      : "rgba(255, 255, 255, .07)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
