from models import ClassEnum, CollegeEnum, ConcentrationEnum, RoleEnum, FeatureEnum, HSREnum

class_mapping = {
    "Class of 2019": ClassEnum.M19,
    "Class of 2020": ClassEnum.M20,
    "Class of 2021": ClassEnum.M21,
    "Class of 2022": ClassEnum.M22,
    "Class of 2023": ClassEnum.M23,
    "Class of 2024": ClassEnum.M24,
    "Class of 2025": ClassEnum.M25,
    "Class of 2026": ClassEnum.M26,
}

college_mapping = {
    "Computational Sciences": CollegeEnum.CS,
    "Business": CollegeEnum.BS,
    "Natural Sciences": CollegeEnum.NS,
    "Arts & Humanities": CollegeEnum.AH,
    "Social Sciences": CollegeEnum.SS,
    "NA": CollegeEnum.NA,
}

concentration_mapping = {
    "Applied Problem Solving": ConcentrationEnum.APS,
    "Arts and Literature": ConcentrationEnum.AL,
    "Brand Management": ConcentrationEnum.BM,
    "Cells and Organisms": ConcentrationEnum.CO,
    "Cognition, Brain, and Behavior": ConcentrationEnum.CBB,
    "Computational Theory and Analysis": ConcentrationEnum.CTA,
    "Computer Science and Artificial Intelligence": ConcentrationEnum.CSAI,
    "Contemporary Knowledge Discovery": ConcentrationEnum.CKD,
    "Data Science and Statistics": ConcentrationEnum.DSS,
    "Designing Societies": ConcentrationEnum.DS,
    "Earth's Systems": ConcentrationEnum.ES,
    "Economics and Society": ConcentrationEnum.ECS,
    "Empirical Approaches to the Social Sciences": ConcentrationEnum.EASS,
    "Enterprise Management": ConcentrationEnum.EM,
    "Historical Forces": ConcentrationEnum.HFC,
    "Humanities Analyses": ConcentrationEnum.HAN,
    "Humanities Applications": ConcentrationEnum.HAP,
    "Humanities Foundations": ConcentrationEnum.HFD,
    "Managing Operational Complexity": ConcentrationEnum.MOC,
    "Mathematics": ConcentrationEnum.MATH,
    "Molecules and Atoms": ConcentrationEnum.MA,
    "New Business Ventures": ConcentrationEnum.NBV,
    "Philosophy, Ethics, and the Law": ConcentrationEnum.PEL,
    "Politics, Government, and Society": ConcentrationEnum.PGS,
    "Problem Solving in Complex Systems": ConcentrationEnum.PSCS,
    "Research Analyses in Natural Science": ConcentrationEnum.RANS,
    "Scalable Growth": ConcentrationEnum.SG,
    "Strategic Finance": ConcentrationEnum.SF,
    "Theoretical Foundations of Natural Science": ConcentrationEnum.TFNS,
    "Theory and Analysis in the Social Sciences": ConcentrationEnum.TASS,
    "Custom / Special concentration": ConcentrationEnum.CSC,
    "NA": ConcentrationEnum.NA,
}

role_mapping = {
    "Advisor": RoleEnum.advisor,
    "Student": RoleEnum.student,
}

feature_mapping = {
    "Creative (e.g., writing, art)": FeatureEnum.creative,
    "Primary research (e.g., with a research group)": FeatureEnum.primary_research,
    "Secondary research (e.g., literature review with analysis/synthesis and proposal for future work)": FeatureEnum.secondary_research,
    "Replication": FeatureEnum.replication,
    "Interview/survey": FeatureEnum.interview_survey,
    "Data analysis": FeatureEnum.data_analysis,
    "Journalism": FeatureEnum.journalism,
    "Philosophical analysis": FeatureEnum.philosophical,
    "Policy analysis/proposal": FeatureEnum.policy,
    "Educational curriculum/materials": FeatureEnum.education,
    "Business plan": FeatureEnum.business,
    "Podcast": FeatureEnum.podcast,
    "App": FeatureEnum.app,
    "Other": FeatureEnum.other,    
}

hsr_mapping = {
    "Have not submitted a description yet": HSREnum.not_yet,
    "Submitted a brief description, awaiting reply": HSREnum.awaiting,
    "Revising based on HSR committee feedback": HSREnum.revising,
    "Reviewed by HSR committee: *NOT* HSR": HSREnum.not_reviewed,
    "Reviewed by HSR committee: Is HSR, possibly exempt": HSREnum.reviewed,
    "Application for exemption submitted to IRB (no later than April 1, 2021)": HSREnum.submitted,
    "Confirmed exempt by IRB (no later than Sept 1, 2021)": HSREnum.confirmed,
    "Exempt status not granted (must pursue other project)": HSREnum.not_granted,
    "N/A (project does NOT involve interacting with any people and/or their information)": HSREnum.na,
    "Other": HSREnum.other,    
}
