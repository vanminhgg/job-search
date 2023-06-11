import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Link,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledDialogTitle = styled(DialogTitle)`
    background-color: #7f5a83;
    background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
    color: white;
    border-radius: 16px 16px 0 0;
`;

const StyledDialogContent = styled(DialogContent)`
    background-color: #7f5a83;
    background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
    padding: 24px;
    border-radius: 0 0 16px 16px;
`;

const StyledCardHeader = styled(CardHeader)`
    && {
        color: white;
        text-decoration: none;
    }
`;

const StyledButton = styled(Button)`
    && {
        background-color: #7f5a83;
        color: white;
        &:hover {
            background-color: #0d324d;
        }
    }
`;

export default function JobCard({ job }) {
    const matches = useMediaQuery("(min-width:1200px)", { noSsr: true });
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <StyledCardHeader
                component={Link}
                href={job.url}
                title={job.title}
                target="_blank"
            />
            <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
                <Typography variant="body1">
                    <strong>Công ty :</strong> {job.company}
                </Typography>
                <Typography variant="body1">
                    <strong>Vị trí :</strong> {job.location.join(", ")}
                </Typography>
                <Typography variant="body1">
                    <strong>Cập nhật :</strong>{" "}
                    {new Date(job.date).toLocaleDateString()} - Bạn còn{" "}
                    <strong>{job.expire}</strong> ngày để ứng tuyển
                </Typography>

                <Stack
                    direction="column"
                    sx={{
                        position: matches ? "absolute" : "static",
                        right: "30px",
                        top: "30px",
                    }}
                    variant="body1"
                >
                    <Typography color="lightblue">
                        <strong> {job.salary}</strong>
                    </Typography>
                    <Divider sx={{ margin: 1 }} />
                    <div>
                        <strong> Cấp bậc: </strong> {job.level}
                    </div>
                </Stack>
                <Stack direction="row" spacing={1} padding={1.5}>
                    {job.benefits.map((benefit, index) => (
                        <Chip key={index} label={benefit} variant="filled" />
                    ))}
                </Stack>
                <Divider />
                <Stack
                    direction="row"
                    spacing={1}
                    padding={1.5}
                    sx={{
                        flexWrap: "wrap",
                        justifyContent: "flex-start",
                    }}
                >
                    {job.skill.map((skill, index) => (
                        <Chip
                            key={index}
                            label={skill}
                            sx={{
                                marginRight: "8px",
                                marginBottom: "8px",
                                backgroundColor: "#F0F4F8",
                                color: "#374151",
                                borderRadius: "12px",
                                fontWeight: 500,
                                fontSize: "14px",
                                padding: "6px 12px",
                                "&:hover": {
                                    backgroundColor: "#E5E7EB",
                                },
                                "&:focus": {
                                    backgroundColor: "#E5E7EB",
                                },
                                "& .MuiChip-deleteIcon": {
                                    color: "#374151",
                                },
                            }}
                        />
                    ))}
                </Stack>

                <JobDialog job={job} open={open} handleClose={handleClose} />
            </CardContent>
            <Box display="flex" justifyContent="flex-end">
                <StyledButton onClick={handleOpen}>Chi tiết</StyledButton>
            </Box>
        </Box>
    );
}

function JobDialog({ job, open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            PaperProps={{
                style: {
                    height: "100%",
                    backgroundColor: "#7f5a83",
                    backgroundImage:
                        "linear-gradient(315deg, #7f5a83 0%, #0d324d 74%)",
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    position: "fixed",
                    borderRadius: "16px",
                    color: "white",
                },
            }}
        >
            <DialogTitle>
                {job.title}
                <Button
                    size="large"
                    sx={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </Button>
            </DialogTitle>
            <DialogContent sx={{ height: "100%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Công ty:
                        </Typography>
                        <Typography variant="body1">{job.company}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Vị trí:
                        </Typography>
                        <Typography variant="body1">
                            {job.location.join(", ")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Cập nhật:
                        </Typography>
                        <Typography variant="body1">
                            {new Date(job.date).toLocaleDateString()} - Bạn còn{" "}
                            {job.expire} ngày để ứng tuyển
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Lương:
                        </Typography>
                        <Typography variant="body1">{job.salary}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Level:
                        </Typography>
                        <Typography variant="body1">{job.level}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="body1" fontWeight="bold">
                            Category:
                        </Typography>
                        <Typography variant="body1">
                            {job.category.join(", ")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight="bold">
                            Benefits:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            {job.benefits.map((benefit, index) => (
                                <Chip
                                    key={index}
                                    label={benefit}
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight="bold">
                            Skills:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            {job.skill.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight="bold">
                            Profile Language:
                        </Typography>
                        <Typography variant="body1">
                            {job.profileLanguage}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold">
                            Mô tả:
                        </Typography>
                        <Box
                            sx={{
                                borderRadius: 5,
                                backgroundColor: "rgba(0,0,0,0.4)",
                                padding: 3,
                                maxHeight: "500px",
                                overflowY: "scroll",
                            }}
                        >
                            <Typography whiteSpace="pre-wrap" variant="body1">
                                {job.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}
