import TotalReport from "../images/icons/menu_totalReport.png"; 
import MediaReport from "../images/icons/menu_media.png";
import GoalImage from "../images/icons/icon_03.png";
import CostIamge from "../images/icons/icon_04.png";
import ClickImage from "../images/icons/icon_05.png";
import ImpImage from "../images/icons/icon_06.png";

import KBCI from "../images/customers/kbinsure.jpg";
import CarrotCI from '../images/customers/carrot.jpg';
import LinaCI from "../images/customers/lina.png";
import AptiCI from "../images/customers/apti.png";

const allCustomers = {
  carrot: {
    name: 'carrot',
    logo: CarrotCI,
    url : '/carrot',
    menu : {
      "리포트": {
        "통합 리포트" : TotalReport, 
        "매체별 리포트": MediaReport
      },
      
      "키워드 리포트": {
        "청약": GoalImage, 
        "CPA": GoalImage, 
        "설계": GoalImage, 
        "광고비": CostIamge,
        "CPS": CostIamge,
        "유입": ClickImage,
      }
    },
  },

  kbinsure: {
    name: 'kbinsure',
    logo: KBCI,
    url : '/kbinsure',
    menu : {
      "리포트": {
        "통합 리포트" : TotalReport, 
        "매체별 리포트": MediaReport,
      },
  
      "키워드 리포트": {
        "청약": GoalImage, 
        "CPA": GoalImage, 
        "설계": GoalImage, 
        "광고비": CostIamge,
        "CPS": CostIamge,
        "유입": ClickImage,
      },
  
      "제휴": {
        "컨택 현황": TotalReport,
        "성과 대시보드": MediaReport,
      }
    }
  },

  lina: {
    name: 'lina',
    logo: LinaCI,
    url : '/lina',
    menu : {
      "리포트": {
        "통합 리포트" : TotalReport, 
        "매체별 리포트": MediaReport,
      },
  
      "키워드 리포트": {
        "대행사 DB": GoalImage, 
        "CPA": GoalImage, 
        "비용": CostIamge,
        "클릭수": ClickImage,
        "노출수": ImpImage,
      },
    },
    formula: [
      "노출수", "클릭수", "비용", 
      ["CTR", "클릭수", "노출수", 100],
      ["CPC", "비용", "클릭수", 100 ],
      "최종 DB",
      ["배정CVR", "최종 DB", "클릭수", 100],
      ["배정CPA", "비용", "최종 DB", 1],
      "SALES",
      ["RR", "SALES", "최종 DB", 100]
    ],
    keywordFormula: [
      "대행사 DB",
      ["CPA", "비용", "대행사 DB", 1],
      "비용", "클릭수", "노출수"
    ],
    depth : [
      "매체", "디바이스", "상품명",
    ]
  },

  apti: {
    name: 'apti',
    logo: AptiCI,
    url : '/apti',
    menu : {
      "리포트": {
        "통합 리포트" : TotalReport, 
        "매체별 리포트": MediaReport,
      },
  
      "키워드 리포트": {
        "청약": GoalImage, 
        "CPA": GoalImage, 
        "설계": GoalImage, 
        "광고비": CostIamge,
        "CPS": CostIamge,
        "유입": ClickImage,
      },
  
      "제휴": {
        "컨택 현황": TotalReport,
        "성과 대시보드": MediaReport,
      }
    },
    formula: [

    ],
    KeywordFormula: [

    ]
  },
}

export default allCustomers;