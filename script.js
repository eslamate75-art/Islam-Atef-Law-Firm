(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const languageButton = document.querySelector(".language-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const form = document.querySelector("#consultation-form");
  const formStatus = document.querySelector("#form-status");
  const dialog = document.querySelector("#detail-dialog");
  const dialogTitle = dialog.querySelector("#dialog-title");
  const dialogDescription = dialog.querySelector(".dialog-description");
  const dialogList = dialog.querySelector(".dialog-list");
  const dialogNote = dialog.querySelector(".dialog-note");
  const dialogProfileImage = dialog.querySelector(".dialog-profile-image");
  const dialogRole = dialog.querySelector(".dialog-role");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentDetail = "";

  const copy = {
    ar: {
      skip: "انتقل إلى المحتوى", brand: "مكتب المحامي إسلام عاطف شريف", brandSub: "محامٍ ومستشار قانوني", brandAr: "العودة إلى الصفحة الرئيسية — مكتب المحامي إسلام عاطف شريف", navLabel: "التنقل الرئيسي", navHome: "الرئيسية", navAbout: "من نحن", navServices: "خدماتنا", navCompanies: "تأسيس الشركات", navDisputes: "القضايا والمنازعات", navProperty: "العقارات والأراضي", navInvestment: "الاستثمار", navContracts: "العقود", navContact: "تواصل معنا", callAr: "اتصل بنا على +20 101 162 8489", languageButtonAr: "Switch to English", menuOpen: "فتح القائمة", menuClose: "إغلاق القائمة",
      heroAlt: "ميزان العدالة في أجواء قانونية كلاسيكية", heroOverline: "مكتب محاماة واستشارات قانونية · مصر", heroLineOne: "مكتب المحامي", heroLineTwo: "إسلام عاطف شريف", heroSub: "خبرة قانونية .. لحلول واقعية", heroBody: "نقدم خدمات واستشارات قانونية متكاملة للأفراد والشركات والمستثمرين، مع التركيز على الحلول العملية وحماية المصالح القانونية.", heroCta: "احجز استشارتك الآن", heroExplore: "استكشف خدماتنا", heroCredential: "إسلام عاطف شريف", scroll: "اكتشف المزيد",
      aboutIndex: "المكتب", aboutOverline: "من نحن", aboutTitleA: "مشورة قانونية", aboutTitleB: "تبدأ بفهم احتياجك.", aboutLead: "يقدم المحامي إسلام عاطف شريف خدمات قانونية للأفراد والشركات والمستثمرين، مع اهتمام خاص بالمعاملات التجارية والاستثمارية والعقارية وصياغة العقود والمنازعات القانونية.", aboutBody: "نتعامل مع كل مسألة وفق وقائعها ومستنداتها، ونشرح الخيارات القانونية بوضوح لدعم قرار عملي ومدروس. لا نقدم وعودًا بنتائج مضمونة؛ فالخطوة الملائمة تتوقف على ظروف كل حالة.", aboutLink: "تعرّف على مجالات العمل", focusAria: "مجالات العمل", focusOne: "الشركات والأعمال", focusTwo: "العقارات والأراضي", focusThree: "العقود", focusFour: "التقاضي والنزاعات", focusFive: "الاستثمار",
      servicesOverline: "خدمات قانونية متكاملة", servicesTitleA: "المسألة أولاً.", servicesTitleB: "ثم الطريق القانوني.", servicesLead: "استكشف مجالات العمل وافتح أي بطاقة لقراءة تفاصيل الخدمة وكيفية بدء النقاش حولها.", companyImageAlt: "مكتب شركة واجتماع أعمال", courtImageAlt: "تفاصيل معمارية لقاعات المحاكم", propertyImageAlt: "مبان وعقارات في أفق المدينة", contractsImageAlt: "وثيقة قانونية وقلم حبر", investmentImageAlt: "مصنع ومنشآت صناعية للاستثمار", consultationImageAlt: "كتب قانونية في مكتبة كلاسيكية", documentsImageAlt: "مستند قانوني قيد الإعداد", representationImageAlt: "قاعة محكمة رسمية", companyKicker: "للشركات ورواد الأعمال", companyTitle: "تأسيس الشركات والمنشآت", companyCardBody: "من اختيار الشكل القانوني إلى خدمات ما بعد التأسيس.", litigationKicker: "التمثيل وتسوية النزاعات", litigationTitle: "القضايا والمنازعات", litigationCardBody: "قراءة الوقائع والمستندات لتحديد الإجراء الملائم.", propertyKicker: "معاملات ومنازعات", propertyTitle: "العقارات والأراضي", propertyCardBody: "مراجعة المستندات والعقود والحقوق العقارية.", contractsKicker: "صياغة ومراجعة", contractsTitle: "العقود والاتفاقيات", contractsCardBody: "التزامات واضحة ومخاطر وشروط تستحق الفهم.", investmentKicker: "المستثمرون والمنشآت", investmentTitle: "الاستثمار والمشروعات الصناعية", investmentCardBody: "متابعة قانونية تراعي طبيعة النشاط والجهات المختصة.", consultKicker: "رأي يسبق القرار", consultTitle: "الاستشارات القانونية", consultCardBody: "عرض الوقائع وفهم البدائل القانونية المتاحة.", documentsKicker: "إعداد المستندات", documentsTitle: "الإنذارات والمذكرات والطلبات القانونية", documentsCardBody: "صياغة مستند يتصل بوقائع المسألة وإجراءاتها.", representationKicker: "حضور وتمثيل قانوني", representationTitle: "التمثيل أمام الجهات والمحاكم المختصة", representationCardBody: "تمثيل يتناسب مع طبيعة المسألة ومرحلتها.", readDetails: "اكتشف التفاصيل", generalDisclaimer: "المعلومات الواردة للتوعية العامة ولا تمثل رأيًا قانونيًا بشأن حالة بعينها.",
      incOverline: "بداية قانونية مدروسة", incTitleA: "تأسيس الشركات", incTitleB: "والمنشآت", incLead: "نقدم خدمات تأسيس الشركات والمنشآت ومتابعة الإجراءات القانونية والإدارية المرتبطة بها، مع المساعدة في اختيار الشكل القانوني المناسب للنشاط وفقًا لطبيعة المشروع واحتياجات المستثمر.", incBody: "يتوقف الاختيار على عناصر مثل طبيعة النشاط، وهيكل الملكية، ورأس المال والمتطلبات القانونية السارية. تُراجع الخيارات مع مراعاة ظروف المشروع والتحقق من الإجراءات لدى الجهات الرسمية المختصة.", incCta: "ناقش تأسيس مشروعك", incImageAlt: "مساحة عمل معاصرة لاجتماع تجاري", incImageCaption: "الشكل القانوني المناسب يبدأ بفهم النشاط", formatsOverline: "أشكال وكيانات مختلفة", formatsTitle: "لكل نشاط هيكله المناسب.", formatsNote: "البيان تعريفي عام؛ توافر الشكل وشروطه يحددان بعد مراجعة النشاط والإجراءات الرسمية السارية.", formatPeople: "شركات الأشخاص", formatCapital: "شركات الأموال", formatOther: "أشكال أخرى", formatGeneral: "شركة التضامن", formatLimitedPartnership: "شركة التوصية البسيطة", formatJointStock: "شركة المساهمة", formatStockPartnership: "شركة التوصية بالأسهم", formatLLC: "الشركة ذات المسؤولية المحدودة", formatOnePerson: "شركة الشخص الواحد", formatEstablishment: "المنشأة الفردية", formatForeign: "فروع ومكاتب تمثيل الشركات الأجنبية", establishmentDisclaimer: "المنشأة الفردية شكل لمزاولة النشاط، وليست نوعًا من أنواع الشركات.", offerKicker: "نطاق الخدمة", offerTitle: "ماذا نقدم في تأسيس الشركات؟", offerIntro: "بحسب طبيعة النشاط والشكل القانوني المختار، يمكن أن يشمل نطاق الدعم ما يلي:", offer1: "دراسة النشاط والمساعدة في اختيار الشكل القانوني", offer2: "تجهيز ومراجعة مستندات التأسيس", offer3: "صياغة ومراجعة عقود التأسيس والأنظمة", offer4: "اختيار الاسم التجاري ومتابعة الإجراءات المقررة", offer5: "متابعة إجراءات السجل التجاري والبطاقة الضريبية لدى الجهات المختصة", offer6: "متابعة إجراءات التأسيس والمستندات ذات الصلة", offer7: "خدمات قانونية للشركات بعد التأسيس", offer8: "تعديل عقود الشركات وأنظمتها وفق المتطلبات", offer9: "دراسة إجراءات زيادة أو تخفيض رأس المال", offer10: "تغيير المديرين أو الشركاء عند الاقتضاء", offer11: "تعديل النشاط أو العنوان وفق الإجراء المطبق", offer12: "متابعة مسائل الاندماج أو التصفية عند الحاجة", offerCaveat: "تختلف الإجراءات والمستندات بحسب الشكل القانوني والنشاط والجهة المختصة. لا تتضمن هذه الصفحة تحديد رسوم أو مدد زمنية أو ضمانًا لقبول إجراء.",
      disputesOverline: "التقاضي وتسوية النزاعات", disputesTitleA: "القضايا", disputesTitleB: "والمنازعات", disputesLead: "يبدأ التعامل مع النزاع بفهم الوقائع والعقود والمراسلات والمستندات قبل مناقشة المسار القانوني المحتمل.", civilOverline: "الحقوق والالتزامات", civilTitle: "القضايا المدنية", civilIntro: "تمثيل قانوني في المنازعات المدنية، بعد مراجعة طبيعة العلاقة وما يتوافر من مستندات.", civil1: "صحة ونفاذ العقود وفسخها أو بطلانها", civil2: "التعويض والمطالبة بالحقوق المالية", civil3: "تنفيذ العقود والإخلال بالالتزامات", civil4: "الملكية والحيازة والإيجارات", commercialOverline: "الشركات والمعاملات", commercialTitle: "القضايا التجارية", commercialIntro: "منازعات المعاملات التجارية وعلاقات الشركات والشركاء، وفق الوقائع والمستندات ذات الصلة.", commercial1: "المنازعات بين الشركات والشركاء", commercial2: "العقود التجارية والمطالبات المالية", commercial3: "التوريد والمقاولات والوكالات", commercial4: "الأوراق التجارية والنشاط التجاري", viewCategories: "استعرض مجالات النزاع", caseDisclaimer: "يتم تحديد نوع الدعوى والإجراء القانوني المناسب بعد دراسة الوقائع والمستندات الخاصة بكل حالة.",
      propertyAlt: "عمارة مدينة بإضاءة هادئة", propertyOverline: "الملكية والمعاملات العقارية", propertyTitleA: "العقارات", propertyTitleB: "والأراضي", propertyLead: "المستند والشرط والتفصيل عناصر أساسية عند التعامل مع عقار أو أرض. يشمل نطاق العمل مراجعة المستندات والعقود والنزاعات بحسب موضوع كل حالة.", propertyCta: "استكشف الخدمات العقارية", propertyService1: "عقود بيع وشراء العقارات والأراضي", propertyService2: "فحص مستندات الملكية والموقف القانوني", propertyService3: "منازعات الملكية والحيازة والإيجارات", propertyService4: "الأراضي الصناعية والاستثمار العقاري",
      contractsImageAlt: "كتابة ومراجعة مستند قانوني", contractsVisualCaption: "التفاصيل تصنع الفرق", contractsOverline: "وضوح قبل التوقيع", contractsTitleA: "صياغة", contractsTitleB: "ومراجعة العقود", contractsLead: "لا تقتصر مراجعة العقد على الصياغة اللغوية، وإنما تشمل تحديد الالتزامات والمخاطر وشروط الدفع والفسخ والجزاءات وآليات فض النزاع.", contractsBody: "تُراجع البنود في ضوء هدف الاتفاق والعلاقة بين أطرافه. ويعتمد التحليل على النص الكامل للعقد والوقائع والمستندات المقدمة.", contractType1: "البيع والإيجار", contractType2: "الشراكة والشركات", contractType3: "المقاولات والتوريد", contractType4: "الخدمات والوكالة", contractType5: "الاستثمار والسرية", contractType6: "التسوية وعدم المنافسة", contractCta: "اطلب مراجعة عقد",
      investmentOverline: "الاستثمار والمشروعات الصناعية", investmentTitleA: "استثمار يبدأ", investmentTitleB: "بخطوات واضحة.", investmentLead: "خدمات قانونية للمستثمرين والمشروعات تراعي طبيعة النشاط، والكيان القانوني، والجهات ذات الصلة.", investmentCta: "ناقش مشروعك", investmentCard1Title: "تأسيس المشروعات", investmentCard1Body: "الأشكال القانونية والعقود التأسيسية.", investmentCard2Title: "الصناعة والأراضي", investmentCard2Body: "مستندات الأرض واحتياجات النشاط.", investmentCard3Title: "الإجراءات والموافقات", investmentCard3Body: "متابعة المستندات وفق الجهة المختصة.", investmentCard4Title: "التوسع وما بعد التأسيس", investmentCard4Body: "العقود والتعديلات القانونية للنشاط.",
      libraryOverline: "معرفة قانونية", libraryTitleA: "المكتبة", libraryTitleB: "القانونية", libraryLead: "مقالات تعريفية تساعد على فهم الأسئلة الأولية. انقر على أي موضوع لقراءة شرح عام، دون الاستناد إلى نصوص قانونية غير موثقة.", libCatBusiness: "الشركات والاستثمار", libCatContracts: "العقود", libCatProperty: "العقارات", libCatCivil: "القضايا المدنية", libCatCommercial: "القضايا التجارية", libCatInvestment: "الاستثمار", libCatLegislation: "القوانين والتشريعات", libCatConsultation: "المعلومات القانونية", libCompany: "ما قبل تأسيس النشاط: أسئلة تساعد على الاختيار", libContracts: "قراءة العقد: الالتزامات والاستثناءات", libProperty: "قبل معاملة عقارية: المستندات والحقوق", libCivil: "عند نشوء نزاع: ترتيب الوقائع والمستندات", libCommercial: "الخلاف التجاري: فهم الالتزام ومراسلات الأطراف", libInvestment: "المشروع الاستثماري: أسئلة قانونية تمهيدية", libLegislation: "كيف تتحقق من مصدر المعلومة القانونية؟", libConsultation: "كيف تستعد لاستشارة قانونية أولى؟", articleRead: "اقرأ المقال", libraryDisclaimer: "المحتوى القانوني للتوعية العامة ولا يُغني عن الاستشارة القانونية المتخصصة.",
      contactOverline: "ابدأ بالتواصل", contactTitleA: "استشارة قانونية", contactTitleB: "قبل اتخاذ القرار.", contactLead: "قرار قانوني صحيح يبدأ بفهم الوقائع والمستندات والمخاطر قبل اتخاذ الإجراء.", contactBody: "أرسل وصفًا مختصرًا لموضوع استفسارك. يفتح النموذج رسالة واتساب لمراجعتها وإرسالها بنفسك.", contactPhones: "الهاتف", contactAddress: "العنوان", addressAr: "الأردنية – المرحلة الثالثة<br>العاشر من رمضان – الشرقية – مصر", addressEn: "El Ordonia, Phase 3<br>10th of Ramadan City, Sharqia, Egypt", whatsappLink: "تواصل عبر واتساب", formTitle: "طلب استشارة", formName: "الاسم", formPhone: "رقم الهاتف", formService: "نوع الخدمة", formNamePlaceholder: "الاسم بالكامل", formPhonePlaceholder: "+20", formServicePlaceholder: "اختر الخدمة", optionCompany: "تأسيس الشركات", optionContracts: "العقود", optionProperty: "العقارات والأراضي", optionDisputes: "القضايا والمنازعات", optionInvestment: "الاستثمار والمشروعات", optionForeigners: "الأجانب والإقامة في مصر", optionConsultation: "استشارة قانونية", optionOther: "موضوع آخر", formMessage: "وصف مختصر للمشكلة", formMessagePlaceholder: "اكتب نبذة مختصرة...", formSubmit: "إرسال طلب الاستشارة", formNote: "سيُفتح واتساب برسالة جاهزة لمراجعتها قبل الإرسال.", formInvalid: "يرجى إكمال الحقول المطلوبة قبل الإرسال.", formFallback: "إذا لم يُفتح واتساب، افتح رسالتك عبر واتساب.", formReady: "تم إعداد الرسالة. راجعها في واتساب قبل الإرسال.",
      footerTagline: "خبرة قانونية .. لحلول واقعية", footerExplore: "استكشف", footerPractice: "مجالات العمل", footerLibrary: "المكتبة القانونية", footerContact: "تواصل معنا", footerAddress: "الأردونيا – المرحلة الثالثة، العاشر من رمضان – الشرقية – مصر", copyright: "مكتب المحامي إسلام عاطف شريف. جميع الحقوق محفوظة.", backTop: "العودة إلى الأعلى", dialogKicker: "مكتب المحامي إسلام عاطف شريف", dialogClose: "إغلاق نافذة التفاصيل", dialogCta: "ناقش هذه الخدمة", modalSwitch: "English", modalSwitchAria: "عرض تفاصيل الخدمة بالإنجليزية"
    },
    en: {
      skip: "Skip to content", brand: "Islam Atef Shreef Law Firm", brandSub: "ATTORNEY AT LAW · LEGAL CONSULTANT", brandAr: "Back to home — Islam Atef Shreef Law Firm", navLabel: "Main navigation", navHome: "Home", navAbout: "About", navServices: "Services", navCompanies: "Company formation", navDisputes: "Litigation & disputes", navProperty: "Real estate & land", navInvestment: "Investment", navContracts: "Contracts", navContact: "Contact", callAr: "Call us at +20 101 162 8489", languageButtonAr: "التبديل إلى العربية", menuOpen: "Open navigation menu", menuClose: "Close navigation menu",
      heroAlt: "Scales of justice in a timeless legal setting", heroOverline: "LEGAL COUNSEL & CONSULTATION · EGYPT", heroLineOne: "THE LAW OFFICE OF", heroLineTwo: "ISLAM ATEF SHREEF", heroSub: "Legal Expertise. Practical Solutions.", heroBody: "Legal services and consultation for individuals, companies and investors, focused on practical solutions and protecting legal interests.", heroCta: "Book a Consultation", heroExplore: "Explore Our Services", heroCredential: "Islam Atef Shreef", scroll: "DISCOVER MORE",
      aboutIndex: "THE FIRM", aboutOverline: "ABOUT US", aboutTitleA: "Legal counsel", aboutTitleB: "that starts by listening.", aboutLead: "Islam Atef Shreef provides legal services to individuals, companies and investors, with particular attention to commercial, investment and real-estate matters, contract drafting and legal disputes.", aboutBody: "Each matter is approached on its own facts and documents. We explain legal options clearly to support informed, practical decisions. Outcomes cannot be promised; the appropriate next step depends on the circumstances of each matter.", aboutLink: "Explore our practice areas", focusAria: "Practice areas", focusOne: "Corporate & business", focusTwo: "Real estate & land", focusThree: "Contracts", focusFour: "Litigation & disputes", focusFive: "Investment",
      servicesOverline: "LEGAL SERVICES", servicesTitleA: "Understand the matter.", servicesTitleB: "Then consider the way forward.", servicesLead: "Explore our practice areas. Open any card to read more about the service and how to begin a conversation.", companyImageAlt: "A contemporary business office", courtImageAlt: "Classical courthouse architecture", propertyImageAlt: "City buildings and real estate", contractsImageAlt: "Legal document and fountain pen", investmentImageAlt: "Industrial facility and manufacturing plant", consultationImageAlt: "Books in a traditional legal library", documentsImageAlt: "Legal documents being prepared", representationImageAlt: "A formal courtroom", companyKicker: "BUSINESSES & ENTREPRENEURS", companyTitle: "Company formation & establishments", companyCardBody: "From considering the legal form to ongoing corporate services.", litigationKicker: "REPRESENTATION & DISPUTE RESOLUTION", litigationTitle: "Litigation & disputes", litigationCardBody: "Reviewing facts and documents to consider the appropriate process.", propertyKicker: "TRANSACTIONS & DISPUTES", propertyTitle: "Real estate & land", propertyCardBody: "Review of documents, agreements and property rights.", contractsKicker: "DRAFTING & REVIEW", contractsTitle: "Contracts & agreements", contractsCardBody: "Understanding obligations, risks and the terms that matter.", investmentKicker: "INVESTORS & ENTERPRISES", investmentTitle: "Investment & industrial projects", investmentCardBody: "Legal follow-through shaped by your activity and relevant authorities.", consultKicker: "COUNSEL BEFORE DECISION", consultTitle: "Legal consultations", consultCardBody: "Discussing facts and understanding available legal options.", documentsKicker: "LEGAL DOCUMENTS", documentsTitle: "Notices, memoranda & legal applications", documentsCardBody: "Preparing documents shaped by the matter and its process.", representationKicker: "LEGAL REPRESENTATION", representationTitle: "Representation before competent authorities & courts", representationCardBody: "Representation appropriate to the matter and its stage.", readDetails: "EXPLORE DETAILS", generalDisclaimer: "Information is for general educational purposes and is not legal advice for a specific matter.",
      incOverline: "A CONSIDERED LEGAL START", incTitleA: "Company formation", incTitleB: "& establishments", incLead: "We assist with company and establishment formation and related legal and administrative procedures, including considering a suitable legal form in light of the project and the investor's needs.", incBody: "The choice can depend on the business activity, ownership structure, capital and applicable legal requirements. Options should be assessed against the project and verified with the relevant official authorities.", incCta: "Discuss your business", incImageAlt: "A contemporary workspace for a business meeting", incImageCaption: "Choosing a legal form begins with understanding the activity", formatsOverline: "DIFFERENT LEGAL FORMS", formatsTitle: "The structure should fit the activity.", formatsNote: "This is general information. Availability and requirements depend on the activity and current official procedures.", formatPeople: "Partnership companies", formatCapital: "Capital companies", formatOther: "Other forms", formatGeneral: "General partnership", formatLimitedPartnership: "Limited partnership", formatJointStock: "Joint-stock company", formatStockPartnership: "Partnership limited by shares", formatLLC: "Limited liability company", formatOnePerson: "One-person company", formatEstablishment: "Sole proprietorship / individual establishment", formatForeign: "Foreign company branches & representative offices", establishmentDisclaimer: "An individual establishment is a form for carrying on a business; it is not a type of company.", offerKicker: "SCOPE OF SERVICES", offerTitle: "How can we assist with formation?", offerIntro: "Depending on the activity and selected legal form, support may include:", offer1: "Reviewing the proposed activity and considering a legal form", offer2: "Preparing and reviewing formation documents", offer3: "Drafting and reviewing constitutive contracts and instruments", offer4: "Considering a trade name and following the applicable process", offer5: "Following commercial-register and tax-card procedures with the relevant authorities", offer6: "Following formation procedures and related documentation", offer7: "Ongoing legal services after formation", offer8: "Amending company instruments in line with applicable requirements", offer9: "Reviewing a proposed capital increase or decrease", offer10: "Changes to managers or partners, where applicable", offer11: "Changes to business activity or address under applicable procedures", offer12: "Matters concerning merger or liquidation, where needed", offerCaveat: "Procedures and documents vary by legal form, activity and authority. No fees, processing times or guaranteed approvals are stated or promised.",
      disputesOverline: "LITIGATION & DISPUTE RESOLUTION", disputesTitleA: "Litigation", disputesTitleB: "& disputes", disputesLead: "A dispute should be approached by first reviewing the facts, contracts, correspondence and available documents before discussing possible legal steps.", civilOverline: "RIGHTS & OBLIGATIONS", civilTitle: "Civil matters", civilIntro: "Legal representation in civil disputes after reviewing the relationship and the available documents.", civil1: "Contract validity, performance, rescission or nullity claims", civil2: "Compensation and financial claims", civil3: "Contract performance and alleged breach of obligations", civil4: "Ownership, possession and tenancy disputes", commercialOverline: "BUSINESS & TRANSACTIONS", commercialTitle: "Commercial matters", commercialIntro: "Commercial transaction, company and partner disputes considered in light of the facts and relevant documents.", commercial1: "Disputes between companies and partners", commercial2: "Commercial agreements and financial claims", commercial3: "Supply, construction and agency disputes", commercial4: "Commercial instruments and business activity", viewCategories: "EXPLORE DISPUTE AREAS", caseDisclaimer: "The type of claim and appropriate legal steps can only be determined after reviewing the facts and documents of each case.",
      propertyAlt: "A modern city building in soft evening light", propertyOverline: "PROPERTY RIGHTS & TRANSACTIONS", propertyTitleA: "Real estate", propertyTitleB: "& land", propertyLead: "Documents, terms and detail matter in a property or land transaction. Support may include reviewing documents, agreements and disputes in light of the circumstances.", propertyCta: "Explore property services", propertyService1: "Property and land sale and purchase contracts", propertyService2: "Ownership documents and legal-status review", propertyService3: "Ownership, possession and tenancy disputes", propertyService4: "Industrial land and real-estate investment",
      contractsImageAlt: "Reviewing and writing a legal document", contractsVisualCaption: "The details make a difference", contractsOverline: "CLARITY BEFORE SIGNING", contractsTitleA: "Contract", contractsTitleB: "drafting & review", contractsLead: "Contract review goes beyond wording: it can address obligations, risks, payment terms, termination, remedies and dispute-resolution mechanisms.", contractsBody: "Terms are reviewed against the agreement's purpose and the parties' relationship, based on the complete contract and the facts and documents provided.", contractType1: "Sale & lease", contractType2: "Partnership & companies", contractType3: "Construction & supply", contractType4: "Services & agency", contractType5: "Investment & confidentiality", contractType6: "Settlement & non-compete", contractCta: "Request a contract review",
      investmentOverline: "INVESTMENT & INDUSTRIAL PROJECTS", investmentTitleA: "Invest with", investmentTitleB: "clearer legal steps.", investmentLead: "Legal support for investors and projects, considered in light of the activity, legal entity and relevant authorities.", investmentCta: "Discuss your project", investmentCard1Title: "Project formation", investmentCard1Body: "Legal forms and constitutive agreements.", investmentCard2Title: "Industry & land", investmentCard2Body: "Land documents and activity requirements.", investmentCard3Title: "Procedures & approvals", investmentCard3Body: "Document follow-up with relevant authorities.", investmentCard4Title: "Expansion & ongoing services", investmentCard4Body: "Contracts and business-related amendments.",
      libraryOverline: "LEGAL KNOWLEDGE", libraryTitleA: "The legal", libraryTitleB: "reading room", libraryLead: "Introductory articles to help frame common questions. Select a topic for general information without relying on unverified legal citations.", libCatBusiness: "COMPANIES & INVESTMENT", libCatContracts: "CONTRACTS", libCatProperty: "REAL ESTATE", libCatCivil: "CIVIL DISPUTES", libCatCommercial: "COMMERCIAL DISPUTES", libCatInvestment: "INVESTMENT", libCatLegislation: "LAWS & REGULATIONS", libCatConsultation: "LEGAL INFORMATION", libCompany: "Before setting up a business: questions to consider", libContracts: "Reading an agreement: obligations and exceptions", libProperty: "Before a property transaction: documents and rights", libCivil: "When a dispute arises: organizing facts and records", libCommercial: "A business disagreement: obligations and correspondence", libInvestment: "Investment projects: preliminary legal questions", libLegislation: "How to check the source of legal information", libConsultation: "How to prepare for an initial legal consultation", articleRead: "READ ARTICLE", libraryDisclaimer: "This legal content is for general educational purposes and is not a substitute for specific legal advice.",
      contactOverline: "START A CONVERSATION", contactTitleA: "Legal advice", contactTitleB: "before you decide.", contactLead: "An informed legal decision starts by understanding the facts, documents and risks before taking action.", contactBody: "Briefly describe your inquiry. The form prepares a WhatsApp message for you to review and send.", contactPhones: "PHONE", contactAddress: "ADDRESS", addressAr: "الأردنية – المرحلة الثالثة<br>العاشر من رمضان – الشرقية – مصر", addressEn: "El Ordonia, Phase 3<br>10th of Ramadan City, Sharqia, Egypt", whatsappLink: "Contact via WhatsApp", formTitle: "CONSULTATION REQUEST", formName: "Name", formPhone: "Phone number", formService: "Service required", formNamePlaceholder: "Full name", formPhonePlaceholder: "+20", formServicePlaceholder: "Choose a service", optionCompany: "Company formation", optionContracts: "Contracts", optionProperty: "Real estate & land", optionDisputes: "Litigation & disputes", optionInvestment: "Investment & projects", optionForeigners: "Foreigners & residency in Egypt", optionConsultation: "Legal consultation", optionOther: "Other matter", formMessage: "Brief description of your inquiry", formMessagePlaceholder: "Briefly describe your inquiry...", formSubmit: "Prepare consultation request", formNote: "A prepared WhatsApp message will open for you to review before sending.", formInvalid: "Please complete the required fields before continuing.", formFallback: "If WhatsApp did not open, open your prepared message in WhatsApp.", formReady: "Your message is ready. Review it in WhatsApp before sending.",
      footerTagline: "Legal expertise. Practical solutions.", footerExplore: "EXPLORE", footerPractice: "PRACTICE AREAS", footerLibrary: "Legal reading room", footerContact: "CONTACT", footerAddress: "El Ordonia, Phase 3, 10th of Ramadan City, Sharqia, Egypt.", copyright: "Islam Atef Shreef Law Firm. All rights reserved.", backTop: "BACK TO TOP", dialogKicker: "ISLAM ATEF SHREEF LAW FIRM", dialogClose: "Close details", dialogCta: "Discuss this service", modalSwitch: "العربية", modalSwitchAria: "عرض تفاصيل الخدمة بالعربية"
    }
  };

  Object.assign(copy.ar, {
    iasLogoAlt: "شعار IAS لمكتب إسلام عاطف شريف للمحاماة",
    facebookAr: "IAS Lawyer على فيسبوك",
    facebookName: "IAS Lawyer على فيسبوك",
    brandVisualAria: "الهوية الرسمية لمكتب إسلام عاطف شريف للمحاماة",
    brandVisualName: "Islam Atef Shreef Law Firm",
    brandVisualArabic: "محاماة واستشارات قانونية",
    brandVisualEdition: "إسلام عاطف شريف · العاشر من رمضان",
    navForeigners: "شؤون الأجانب",
    navPortfolio: "الأعمال القانونية",
    navLocation: "موقع المكتب",
    founderOverline: "تعرف على المؤسس",
    founderTitle: "محامٍ – مؤسس ومدير المكتب",
    founderBio: "بدأ مسيرته المهنية في مجال المحاماة والعمل القانوني منذ عام 2019، مع ممارسة عملية في القضايا والمنازعات والإجراءات القانونية، والاستشارات، وصياغة ومراجعة العقود والمستندات القانونية.",
    founderPracticeSummary: "تشمل مجالات العمل القضايا المدنية والتجارية والجنائية والأحوال الشخصية، والمنازعات العقارية، وقانون الشركات والأعمال، وتأسيس الشركات، والعقود، والمسائل الصناعية والاستثمارية، والاستشارات القانونية، وشؤون الأجانب والإقامة في مصر.",
    founderPortraitAlt: "الصورة الرسمية للأستاذ إسلام عاطف شريف",
    founderLearnMore: "اعرف المزيد",
    foreignersOverline: "خدمات قانونية للمقيمين والمستثمرين الأجانب",
    foreignersTitleA: "الإقامات وشؤون",
    foreignersTitleB: "الأجانب في مصر",
    foreignersLead: "مساندة قانونية للأجانب والمستثمرين في مصر في المسائل المرتبطة بالإقامة، وفهم الإجراءات والمستندات ومتابعتها بحسب الحالة والجهة المختصة.",
    foreignersCta: "استكشف خدمات الأجانب والإقامة",
    foreignService1: "مسائل إقامة الأجانب",
    foreignService2: "الإقامة المرتبطة بالاستثمار",
    foreignService3: "المستندات ومتابعة الإجراءات",
    foreignService4: "استشارات للمستثمرين والمغتربين",
    foreignersDisclaimer: "تخضع مسائل الإقامة لشروط الجهات المختصة؛ لا تُضمن الموافقة أو نتيجة طلب.",
    portfolioOverline: "معرض الأعمال المهنية",
    portfolioTitleA: "الأعمال",
    portfolioTitleB: "والخدمات القانونية",
    portfolioLead: "عرض منظّم لأعمال المكتب بحسب المجال. تُنشر الوثائق فقط بعد مراجعتها، وحجب البيانات الخاصة، والحصول على الإذن المناسب.",
    portfolioCategoriesAria: "فئات الأعمال القانونية",
    galleryCompany: "تأسيس الشركات والخدمات المؤسسية",
    galleryCommercial: "السجل التجاري والمستندات الضريبية",
    galleryIndustrialRegistration: "القيد الصناعي وتراخيص تشغيل المصانع",
    galleryIndustrialInvestment: "الاستثمار الصناعي وتقنين المصانع",
    galleryProperty: "العقارات والأراضي",
    galleryContracts: "العقود والمستندات القانونية",
    galleryLitigation: "التقاضي ومستندات المحاكم",
    galleryForeigners: "الأجانب والإقامة",
    galleryInvestment: "الاستثمار وخدمات الأعمال",
    portfolioSelectedLabel: "الفئة المختارة",
    portfolioEmpty: "سيُضاف إلى هذه الفئة ما يقدمه المكتب من مستندات فعلية بعد استلامها ومراجعتها واعتماد نشرها.",
    portfolioPrivacy: "تُحجب أو تُموّه أي بيانات شخصية أو سرية قبل النشر، مع مراعاة خصوصية العملاء والحصول على موافقتهم.",
    portfolioNoImages: "لا توجد مستندات أو صور أعمال مقدّمة للنشر في هذه الفئة حاليًا.",
    locationOverline: "زوروا المكتب",
    locationTitleA: "موقع",
    locationTitleB: "المكتب",
    locationLead: "الأردنية – المرحلة الثالثة – العاشر من رمضان – الشرقية – مصر",
    mapTitle: "خريطة مدينة العاشر من رمضان، الشرقية، مصر",
    mapCaption: "العاشر من رمضان · محافظة الشرقية",
    locationFirm: "ISLAM ATEF SHREEF LAW FIRM",
    locationAddressTitle: "عنوان المكتب",
    locationAddressAr: "الأردنية – المرحلة الثالثة<br>العاشر من رمضان – الشرقية – مصر",
    locationAddressEn: "Al Ordonia, Phase 3<br>10th of Ramadan City, Sharqia, Egypt",
    openMaps: "افتح في خرائط Google",
    locationCall: "اتصل بالمكتب",
    locationWhatsApp: "راسلنا عبر واتساب"
  });
  Object.assign(copy.en, {
    iasLogoAlt: "IAS monogram, Islam Atef Shreef Law Firm",
    facebookAr: "IAS Lawyer on Facebook",
    facebookName: "IAS Lawyer on Facebook",
    brandVisualAria: "Official identity of Islam Atef Shreef Law Firm",
    brandVisualName: "Islam Atef Shreef Law Firm",
    brandVisualArabic: "LEGAL PRACTICE & CONSULTATION",
    brandVisualEdition: "ISLAM ATEF SHREEF · 10TH OF RAMADAN CITY",
    navForeigners: "Foreigners & residency",
    navPortfolio: "Legal work",
    navLocation: "Our location",
    founderOverline: "MEET THE FOUNDER",
    founderTitle: "Attorney at Law · Founder & Managing Director",
    founderBio: "He began his professional career in advocacy and legal practice in 2019, gaining practical experience in cases, disputes and legal procedures, consultations, and drafting and reviewing contracts and legal documents.",
    founderPracticeSummary: "His areas of practice include civil and commercial litigation, criminal matters, family and personal-status matters, real-estate disputes, corporate and business law, company formation, contracts, industrial and investment matters, legal consultations, and foreigners' and residency matters in Egypt.",
    founderPortraitAlt: "Official portrait of Islam Atef Shreef",
    founderLearnMore: "Learn More",
    foreignersOverline: "LEGAL SERVICES FOR FOREIGN RESIDENTS & INVESTORS",
    foreignersTitleA: "Foreigners &",
    foreignersTitleB: "residency in Egypt",
    foreignersLead: "Legal assistance for foreigners and investors in Egypt on residency-related matters, understanding procedures and documents, and following up according to the circumstances and relevant authority.",
    foreignersCta: "Explore foreigners & residency services",
    foreignService1: "Foreigners' residency matters",
    foreignService2: "Investment-related residency",
    foreignService3: "Documentation & procedural follow-up",
    foreignService4: "Consultations for investors & expatriates",
    foreignersDisclaimer: "Residency matters remain subject to competent authorities' requirements; approvals and outcomes are not guaranteed.",
    portfolioOverline: "PROFESSIONAL WORK GALLERY",
    portfolioTitleA: "Legal work",
    portfolioTitleB: "& professional services",
    portfolioLead: "A categorized presentation of the firm's work. Documents are published only after review, sensitive information is redacted and appropriate permission is obtained.",
    portfolioCategoriesAria: "Legal work categories",
    galleryCompany: "Company formation & corporate services",
    galleryCommercial: "Commercial registration & tax documents",
    galleryIndustrialRegistration: "Industrial registration & factory operating licences",
    galleryIndustrialInvestment: "Industrial investment & factory regularization",
    galleryProperty: "Real estate & land",
    galleryContracts: "Contracts & legal documents",
    galleryLitigation: "Litigation & court documents",
    galleryForeigners: "Foreigners & residency",
    galleryInvestment: "Investment & business services",
    portfolioSelectedLabel: "SELECTED CATEGORY",
    portfolioEmpty: "Actual work documents will be added to this category after they are received, reviewed and approved for publication.",
    portfolioPrivacy: "Personal or confidential details must be redacted before publication, respecting client privacy and obtaining their consent.",
    portfolioNoImages: "No work documents or images have been submitted for publication in this category yet.",
    locationOverline: "VISIT OUR OFFICE",
    locationTitleA: "Our",
    locationTitleB: "location",
    locationLead: "Al Ordonia, Phase 3 · 10th of Ramadan City · Sharqia, Egypt",
    mapTitle: "Map of 10th of Ramadan City, Sharqia, Egypt",
    mapCaption: "10TH OF RAMADAN CITY · SHARQIA",
    locationFirm: "ISLAM ATEF SHREEF LAW FIRM",
    locationAddressTitle: "OFFICE ADDRESS",
    locationAddressAr: "الأردنية – المرحلة الثالثة<br>العاشر من رمضان – الشرقية – مصر",
    locationAddressEn: "Al Ordonia, Phase 3<br>10th of Ramadan City, Sharqia, Egypt",
    openMaps: "Open in Google Maps",
    locationCall: "Call the office",
    locationWhatsApp: "Message us on WhatsApp"
  });

  const galleryKeys = {
    company: "galleryCompany",
    commercial: "galleryCommercial",
    "industrial-registration": "galleryIndustrialRegistration",
    "industrial-investment": "galleryIndustrialInvestment",
    "real-estate": "galleryProperty",
    contracts: "galleryContracts",
    litigation: "galleryLitigation",
    foreigners: "galleryForeigners",
    investment: "galleryInvestment"
  };
  Object.assign(copy.ar, {
    founderPortraitAlt: "الصورة الرسمية للأستاذ إسلام عاطف شريف",
    founderPortraitCaption: "المؤسس ومدير المكتب",
    founderOverline: "تعرف على المؤسس",
    founderPrefix: "الأستاذ/",
    founderName: "إسلام عاطف شريف",
    founderTitle: "محامٍ – مؤسس ومدير المكتب",
    founderBio: "بدأ الأستاذ إسلام عاطف شريف مسيرته المهنية في مجال المحاماة والعمل القانوني منذ عام 2019، واكتسب خبرة عملية في التعامل مع مختلف أنواع القضايا والمنازعات والإجراءات القانونية، إلى جانب تقديم الاستشارات القانونية وصياغة ومراجعة العقود والمستندات القانونية.",
    founderPracticeSummary: "تشمل مجالات العمل القضايا المدنية والتجارية والجنائية والأحوال الشخصية والمنازعات العقارية، بالإضافة إلى تأسيس الشركات، الأعمال التجارية، العقود، والاستشارات القانونية.",
    founderLearnMore: "اعرف المزيد"
  });
  Object.assign(copy.en, {
    founderPortraitAlt: "Official portrait of Islam Atef Shreef",
    founderPortraitCaption: "Founder & Managing Director",
    founderOverline: "MEET THE FOUNDER",
    founderPrefix: "Mr.",
    founderName: "Islam Atef Shreef",
    founderTitle: "Attorney at Law · Founder & Managing Director",
    founderBio: "Islam Atef Shreef began his professional career in advocacy and legal practice in 2019. He has gained practical experience handling various types of cases, disputes and legal procedures, as well as providing legal consultations and drafting and reviewing contracts and legal documents.",
    founderPracticeSummary: "His areas of practice include civil, commercial and criminal matters, personal-status matters and real-estate disputes, as well as company formation, commercial matters, contracts and legal consultations.",
    founderLearnMore: "Learn More"
  });

  const details = {
    "foreigners-residency": {
      ar: ["الإقامات وشؤون الأجانب في مصر", "خدمات واستشارات قانونية للأجانب والمستثمرين والمغتربين في مصر في المسائل المرتبطة بالإقامة والمستندات والإجراءات.", ["مراجعة المعلومات والمستندات المتصلة بمسألة الإقامة.", "مساعدة قانونية للمستثمرين فيما يتعلق بمسائل إقامة المستثمر وفق الحالة.", "تجهيز ومراجعة المستندات ومتابعة الإجراءات لدى الجهة المختصة.", "استشارات قانونية للمستثمرين الأجانب والمغتربين في مصر."], "تتحدد الشروط والمستندات والقرارات من الجهات الرسمية المختصة بحسب الحالة؛ لا يقدم المكتب ضمانًا للموافقة أو نتيجة أي طلب."],
      en: ["Foreigners & residency services in Egypt", "Legal services and consultations for foreigners, investors and expatriates in Egypt on residency matters, documents and procedures.", ["Reviewing information and records related to a residency matter.", "Legal assistance related to investor residency, according to the circumstances.", "Preparing and reviewing documentation and following up with competent authorities.", "Legal consultations for foreign investors and expatriates in Egypt."], "Requirements, documents and decisions are determined by official authorities according to the case. No application approval or outcome is guaranteed."]
    },
    "foreign-residency": {
      ar: ["مسائل إقامة الأجانب", "مساعدة قانونية في فهم مسألة الإقامة والمستندات والإجراءات ذات الصلة وفق الظروف المعروضة.", ["استعراض المعلومات والمستندات المتاحة.", "تحديد الأسئلة التي يلزم التحقق منها لدى الجهة المختصة.", "متابعة الإجراءات والمراسلات ضمن نطاق التكليف."], "تخضع مسائل الإقامة للقواعد والإجراءات الرسمية السارية وقرار الجهة المختصة."],
      en: ["Foreigners' residency matters", "Legal assistance to understand a residency matter, related documents and procedures in light of the circumstances presented.", ["Reviewing available information and documents.", "Identifying questions to verify with the competent authority.", "Following procedures and correspondence within the agreed scope."], "Residency matters remain subject to current official rules, procedures and the competent authority's decision."]
    },
    "investor-residency": {
      ar: ["الإقامة المرتبطة بالاستثمار", "مساعدة قانونية تتعلق بمسائل إقامة المستثمر، ومراجعة ارتباط المستندات المقدمة بالنشاط أو المشروع بحسب الحالة.", ["فهم طبيعة الاستثمار والكيان والمستندات المرتبطة به.", "مراجعة الملف وما يحتاج إلى استيضاح أو استكمال.", "متابعة الإجراءات مع الجهة المختصة ضمن نطاق التكليف."], "تختلف الشروط بحسب الإطار الرسمي الساري والوقائع. لا يعني الدعم القانوني استحقاق الإقامة أو ضمان إصدارها."],
      en: ["Investment-related residency", "Legal assistance relating to investor residency, including reviewing how the supplied documents relate to the activity or project in the particular case.", ["Understanding the investment, entity and related documents.", "Reviewing the file and identifying information that may need clarification or completion.", "Following up with the competent authority within the agreed scope."], "Requirements depend on current official rules and individual circumstances. Assistance does not establish eligibility or guarantee residency."]
    },
    "foreign-procedures": {
      ar: ["المستندات ومتابعة الإجراءات", "مراجعة وتنظيم المستندات المتعلقة بالمسألة ومتابعة الإجراء أمام الجهة المعنية وفق المعلومات المتاحة.", ["حصر المستندات والمعلومات التي يقدمها صاحب الشأن.", "مراجعة الاتساق والبيانات التي تحتاج إلى تحقق.", "متابعة الطلبات أو المراسلات ضمن حدود التكليف."], "يحدد المسؤولون الرسميون المستندات المطلوبة وقبول الطلبات والقرارات الصادرة بشأنها."],
      en: ["Documentation & procedural follow-up", "Reviewing and organizing documents relating to the matter and following up with the relevant authority based on available information.", ["Identifying documents and information supplied by the client.", "Reviewing consistency and information requiring verification.", "Following up on applications or correspondence within the agreed scope."], "Official authorities determine required documentation, application acceptance and resulting decisions."]
    },
    "expat-consultation": {
      ar: ["استشارات للمستثمرين والمغتربين", "استشارة قانونية لمناقشة السؤال القانوني والمسائل العملية ذات الصلة باستثمار أو إقامة أجنبي في مصر.", ["عرض الوقائع والمستندات ذات الصلة.", "مناقشة الأسئلة القانونية والخيارات التي تستلزم تحققًا رسميًا.", "توضيح الخطوات التالية المناسبة في ضوء المعلومات المقدمة."], "تعتمد المشورة على الوقائع والوثائق المتاحة، ولا تحل محل قرار الجهة الحكومية المختصة."],
      en: ["Consultations for investors & expatriates", "Legal consultations to discuss legal questions and practical matters related to investment or a foreign national's stay in Egypt.", ["Presenting relevant facts and documents.", "Discussing legal questions and options requiring official verification.", "Explaining appropriate next steps in light of the information provided."], "Advice is based on available facts and documents and does not replace decisions made by competent government authorities."]
    },
    "founder-profile": {
      ar: [
        "الأستاذ/ إسلام عاطف شريف",
        "بدأ مسيرته المهنية في مجال المحاماة والعمل القانوني منذ عام 2019، مع ممارسة عملية في القضايا والمنازعات والإجراءات القانونية، والاستشارات، وصياغة ومراجعة العقود والمستندات القانونية.",
        ["القضايا المدنية والتجارية.", "القضايا الجنائية والأحوال الشخصية.", "المنازعات العقارية.", "قانون الشركات والأعمال وتأسيس الشركات.", "العقود والمسائل الصناعية والاستثمارية.", "الاستشارات القانونية.", "شؤون الأجانب والإقامة في مصر."],
        "يقدم المكتب خدماته وفق ظروف كل مسألة ومستنداتها، دون ضمان نتيجة مسبقة."
      ],
      en: [
        "Islam Atef Shreef",
        "He began his professional career in advocacy and legal practice in 2019, gaining practical experience in cases, disputes and legal procedures, consultations, and drafting and reviewing contracts and legal documents.",
        ["Civil and commercial litigation.", "Criminal matters and family and personal-status matters.", "Real-estate and property disputes.", "Corporate and business law and company formation.", "Contracts and industrial and investment matters.", "Legal consultations.", "Foreigners' and residency matters in Egypt."],
        "The office approaches each matter in light of its circumstances and documents; outcomes are not guaranteed."
      ]
    },
    company: {
      ar: ["تأسيس الشركات والمنشآت", "نساعد في دراسة احتياجات المشروع واختيار الشكل القانوني المناسب ومتابعة مستندات وإجراءات التأسيس ذات الصلة.", ["مناقشة النشاط وهيكل الملكية والاحتياجات التشغيلية.", "تجهيز ومراجعة مستندات التأسيس وصياغة العقود والأنظمة.", "متابعة الإجراءات لدى الجهات المختصة بحسب الشكل والنشاط.", "دعم قانوني لاحق في تعديل مستندات الشركة وخدماتها."], "تختلف المتطلبات حسب طبيعة النشاط والشكل القانوني والجهة المختصة. يتم التحقق من الإجراءات السارية من خلال المصادر الرسمية المعنية، ومنها الهيئة العامة للاستثمار والمناطق الحرة (GAFI)، بحسب الحالة."],
      en: ["Company formation & establishments", "We can help assess a project's needs, consider an appropriate legal form and follow up on relevant formation documents and procedures.", ["Discussing the proposed activity, ownership structure and operational needs.", "Preparing and reviewing formation documents, constitutive contracts and instruments.", "Following up with relevant authorities according to the activity and legal form.", "Ongoing support with corporate amendments and legal services."], "Requirements vary by activity, legal form and authority. Current procedures should be verified with relevant official sources, including GAFI where applicable."]
    },
    litigation: {
      ar: ["القضايا والمنازعات", "التمثيل القانوني وتسوية النزاعات يبدأان بفهم أصل العلاقة، والطلبات، والمراسلات، والمستندات المتاحة.", ["مراجعة الوقائع والعقود والإخطارات والمستندات.", "بحث طبيعة النزاع والطلبات والمركز القانوني للأطراف.", "مناقشة الخيارات الإجرائية والمتابعة أمام الجهات والمحاكم المختصة.", "تقييم تطورات الملف مع ظهور معلومات أو مستندات جديدة."], "يُحدد نوع الدعوى والمسار الملائم بعد مراجعة كل حالة؛ ولا يمكن استنتاج نتيجة النزاع من وصف مختصر وحده."],
      en: ["Litigation & disputes", "Legal representation and dispute resolution begin with understanding the underlying relationship, the issues, correspondence and available documents.", ["Reviewing the facts, agreements, notices and supporting documents.", "Considering the nature of the dispute, requested remedies and the parties' positions.", "Discussing procedural options and representation before relevant authorities and courts.", "Reassessing the matter as new information or documents become available."], "The appropriate claim and course of action depend on an individual case review. No outcome can be determined from a brief description alone."]
    },
    property: {
      ar: ["العقارات والأراضي", "مراجعة عقارية تراعي طبيعة المعاملة والمستندات المتاحة والحقوق والالتزامات المرتبطة بالعقار أو الأرض.", ["صياغة ومراجعة عقود بيع وشراء العقارات والأراضي والإيجار.", "فحص مستندات الملكية والمعلومات المتاحة عن الموقف القانوني.", "منازعات الملكية والحيازة والإيجارات ودعاوى صحة ونفاذ العقود.", "الإخلاء والعقارات الاستثمارية والأراضي الصناعية بحسب طبيعة الحالة."], "مراجعة المستندات المتاحة لا تعادل ضمانًا لتسجيل ملكية أو حسم نزاع، ويعتمد نطاق الفحص على ما تقدمه الجهات والأطراف المعنية."],
      en: ["Real estate & land", "Property support considers the nature of a transaction, available documents and the relevant rights and obligations.", ["Drafting and reviewing property, land-sale and lease agreements.", "Reviewing ownership documents and available information about the property's legal status.", "Ownership, possession, tenancy and contract-performance disputes.", "Eviction matters, investment property and industrial land, as appropriate."], "A review of available documents does not guarantee registration or resolve a dispute. The scope depends on records provided by the relevant authorities and parties."]
    },
    contracts: {
      ar: ["صياغة ومراجعة العقود", "تتناول مراجعة العقد أثر البنود على الأطراف، وليس سلامة الصياغة اللغوية وحدها.", ["عقود البيع والإيجار والشراكة والشركات.", "عقود المقاولات والتوريد والخدمات والوكالة.", "عقود الاستثمار واتفاقيات السرية والتسوية.", "مراجعة الالتزامات وشروط الدفع والإنهاء والجزاءات وآليات فض النزاع.", "دراسة شروط عدم المنافسة عند ملاءمتها للحالة والقانون واجب التطبيق."], "الرأي في أي بند، بما في ذلك شرط عدم المنافسة، يتطلب مراجعة النص الكامل والظروف ذات الصلة، ولا يُفترض انطباقه تلقائيًا."],
      en: ["Contract drafting & review", "Review considers how provisions affect the parties, not merely whether the wording is grammatically correct.", ["Sale, lease, partnership and company agreements.", "Construction, supply, services and agency agreements.", "Investment agreements, confidentiality and settlement agreements.", "Reviewing obligations, payments, termination, remedies and dispute-resolution clauses.", "Considering non-compete provisions where appropriate to the circumstances and applicable law."], "Advice on any provision, including a non-compete clause, requires review of the complete text and circumstances; enforceability should never be assumed."]
    },
    investment: {
      ar: ["الاستثمار والمشروعات الصناعية", "دعم قانوني للمستثمرين والمنشآت في مسائل التأسيس والعقود والأراضي والمستندات المرتبطة بالنشاط.", ["تأسيس الكيان ومراجعة عقود المشروع.", "المشروعات الصناعية ومعاملات الأراضي المرتبطة بها.", "متابعة المستندات والإجراءات والموافقات المطلوبة بحسب النشاط والجهة المختصة.", "خدمات الشركات والتعديلات القانونية والتوسعات الاستثمارية."], "يتحدد المسار وفق النشاط والموقع والجهات المعنية. المتابعة لا تعني ضمان صدور ترخيص أو موافقة، إذ تخضع الطلبات لمراجعة الجهة المختصة."],
      en: ["Investment & industrial projects", "Legal support for investors and businesses in formation, contracts, land and activity-related documents.", ["Entity formation and project-agreement review.", "Industrial projects and related land transactions.", "Following up on documents, procedures and approvals required for the activity and relevant authority.", "Corporate services, legal amendments and investment expansion."], "The process depends on the activity, location and relevant authorities. Assistance does not guarantee a licence or approval; applications remain subject to the authority's review."]
    },
    consultation: {
      ar: ["الاستشارات القانونية", "قرار قانوني صحيح يبدأ بفهم الوقائع والمستندات والمخاطر قبل اتخاذ الإجراء.", ["عرض الوقائع بترتيب زمني واضح.", "مراجعة العقود والمراسلات والمستندات المرتبطة بالمسألة.", "تحديد الأسئلة القانونية والخيارات الممكنة.", "مناقشة الخطوات التالية وما قد يلزم من معلومات إضافية."], "الاستشارة الأولية لا تُغني بالضرورة عن مراجعة جميع المستندات أو استكمال التحقق من الوقائع."],
      en: ["Legal consultation", "A sound legal decision begins with understanding the facts, documents and risks before taking action.", ["Presenting the facts in a clear timeline.", "Reviewing related contracts, correspondence and documents.", "Identifying legal questions and possible options.", "Discussing next steps and any additional information that may be needed."], "An initial consultation may not replace a full review of documents or further fact-checking."]
    },
    partnership: { ar: ["شركة التضامن", "شكل من أشكال شركات الأشخاص. تحديد مدى ملاءمته يتطلب دراسة النشاط والعلاقة بين الشركاء والمتطلبات الرسمية السارية.", ["اتفاق الشركاء وطريقة الإدارة واتخاذ القرار.", "بيان الحقوق والالتزامات ومساهمة كل شريك في مستندات التأسيس.", "مراجعة ما يلزم من إجراءات ومستندات لدى الجهات المعنية."], "هذا وصف تعريفي عام وليس رأيًا بشأن الالتزامات القانونية المترتبة على شكل معين. تُراجع الطبيعة والآثار بمشورة قانونية مخصصة."], en: ["General partnership", "A form of partnership company. Suitability should be considered against the activity, partner relationship and current official requirements.", ["Partner arrangements, management and decision-making.", "Setting out rights, obligations and contributions in the formation documents.", "Reviewing relevant documents and procedures with the appropriate authorities."], "This is general information, not advice about the legal obligations of a particular form. Legal effects should be confirmed for the specific circumstances."] },
    "limited-partnership": { ar: ["شركة التوصية البسيطة", "أحد الأشكال المعروفة لشركات الأشخاص. قبل الاختيار، تُدرس أدوار الشركاء والحقوق والالتزامات التي يقررها الإطار القانوني المنطبق.", ["تحديد هيكل الشركاء وطبيعة مساهماتهم.", "صياغة ومراجعة عقد التأسيس وبنوده.", "التحقق من المستندات والإجراءات المطلوبة لدى الجهات الرسمية."], "لا يُستنتج من الاسم وحده نطاق مسؤولية أو صلاحيات أي شريك؛ يلزم التحقق من النصوص المنطبقة ومستندات الحالة."], en: ["Limited partnership", "A recognized form of partnership company. Roles, rights and obligations should be assessed under the applicable legal framework before selecting this structure.", ["Identifying the partner structure and nature of contributions.", "Drafting and reviewing the constitutive agreement.", "Checking required documents and procedures with the relevant authorities."], "Liability and authority cannot be determined from the label alone; the applicable rules and documents must be verified."] },
    "joint-stock": { ar: ["شركة المساهمة", "يُبحث هذا الشكل في ضوء المشروع وهيكل الملكية والحوكمة ومتطلبات التأسيس والإفصاح المنطبقة.", ["دراسة هيكل الملكية والإدارة المقترح.", "مراجعة النظام الأساسي وعقود التأسيس والقرارات.", "التحقق من متطلبات التأسيس لدى الجهات الرسمية المختصة."], "المتطلبات والآثار تخضع للنصوص السارية والجهات المعنية. ينبغي التحقق منها رسميًا قبل اتخاذ القرار."], en: ["Joint-stock company", "This legal form is considered in light of the project, ownership structure, governance and applicable formation and disclosure requirements.", ["Reviewing the proposed ownership and management structure.", "Reviewing articles, formation documents and resolutions.", "Verifying current formation requirements with the relevant official authorities."], "Requirements and legal consequences depend on current rules and relevant authorities; verify these officially before deciding."] },
    "stock-partnership": { ar: ["شركة التوصية بالأسهم", "شكل قانوني له هيكل خاص. تُدرس ملاءمته للمشروع بالاستناد إلى المستندات الرسمية والاحتياجات الفعلية.", ["تحليل هيكل الملكية والحوكمة الملائم.", "صياغة ومراجعة المستندات التأسيسية.", "التحقق من المتطلبات والإجراءات الحالية لدى الجهات المعنية."], "التفاصيل التنظيمية قد تتغير؛ تُراجع المصادر الرسمية قبل تقديم الطلب أو اعتماد هذا الشكل."], en: ["Partnership limited by shares", "A distinct legal form whose suitability should be reviewed against the project and current official requirements.", ["Considering an appropriate ownership and governance structure.", "Drafting and reviewing constitutive documents.", "Verifying current requirements and procedures with relevant authorities."], "Regulatory details can change. Verify current official guidance before applying or choosing this form."] },
    llc: { ar: ["الشركة ذات المسؤولية المحدودة", "يمكن دراسة هذا الشكل عند اختيار بنية شركة لمشروع أو نشاط، مع مراجعة الملكية والإدارة والوثائق المطبقة.", ["مناقشة طبيعة النشاط وهيكل الشركاء.", "صياغة ومراجعة عقد التأسيس والتعديلات.", "التحقق من المتطلبات السارية بحسب النشاط والجهة المختصة."], "الاسم وحده لا يبين كافة الآثار القانونية أو الاستثناءات المحتملة؛ يلزم تقييم النصوص ووثائق كل حالة."], en: ["Limited liability company", "This form may be considered when structuring a company for a project or activity, subject to review of ownership, management and applicable documents.", ["Discussing the activity and partner structure.", "Drafting and reviewing the constitutive agreement and amendments.", "Verifying current requirements for the activity and relevant authority."], "The label alone does not describe every legal consequence or exception. The applicable rules and documents need a case-specific review."] },
    "one-person": { ar: ["شركة الشخص الواحد", "شكل قانوني للشركات يُدرس عندما يرغب مالك واحد في تأسيس كيان، مع التحقق من المتطلبات والإجراءات الرسمية السارية.", ["فهم النشاط وخطة المشروع.", "مراجعة مستندات الشركة وآليات إدارتها.", "التحقق من ملاءمة الشكل وإجراءاته لدى الجهات المختصة."], "ينبغي التمييز بين شركة الشخص الواحد والمنشأة الفردية؛ لكل منهما وصفه ومتطلباته. تُراجع التفاصيل الرسمية قبل التأسيس."], en: ["One-person company", "A company form that may be considered for a single-owner project, subject to current official eligibility requirements and procedures.", ["Understanding the activity and project plan.", "Reviewing company documents and management arrangements.", "Verifying suitability and procedures with the competent authorities."], "A one-person company is distinct from an individual establishment. Their definitions and requirements should be confirmed through current official sources."] },
    establishment: { ar: ["المنشأة الفردية", "إطار لمزاولة النشاط الفردي يختلف في وصفه عن الشركة. يتطلب الاختيار مقارنة طبيعة النشاط والالتزامات والاحتياجات الإدارية.", ["تحديد النشاط وصاحبه وهيكل العمل المتوقع.", "مراجعة إجراءات القيد والمستندات ذات الصلة.", "بحث مدى ملاءمة هذا الشكل مقارنة بالبدائل المتاحة."], "المنشأة الفردية ليست نوعًا من أنواع الشركات. تُراجع الآثار والمتطلبات النظامية مع الجهات الرسمية المختصة."], en: ["Individual establishment", "A business form distinct from a company. Choosing it requires considering the activity, obligations and administrative needs.", ["Identifying the activity, owner and anticipated business structure.", "Reviewing registration procedures and related documents.", "Considering suitability against other available forms."], "An individual establishment is not a type of company. Confirm its current requirements and legal effects with relevant official authorities."] },
    "foreign-branch": { ar: ["فروع ومكاتب تمثيل الشركات الأجنبية", "قد تختلف الإجراءات باختلاف غرض الحضور في مصر، وطبيعة نشاط الشركة الأم، والجهات المعنية.", ["مراجعة غرض الفرع أو مكتب التمثيل المقترح.", "دراسة مستندات الشركة الأجنبية وما يتطلبه تقديمها.", "التحقق من المتطلبات والإجراءات الحالية لدى الجهات المختصة."], "الفرع ومكتب التمثيل صورتان مختلفتان من حيث الغرض؛ توافر كل منهما ومتطلباته يخضع للتحقق الرسمي."], en: ["Foreign company branches & representative offices", "Procedures can vary according to the purpose of the Egyptian presence, the foreign company's activity and the authorities involved.", ["Reviewing the intended purpose of a branch or representative office.", "Considering the foreign company's documents and presentation requirements.", "Verifying current requirements and procedures with competent authorities."], "Branches and representative offices serve different purposes. Availability and requirements must be officially verified for the proposed activity."] },
    "civil-cases": { ar: ["القضايا المدنية", "يتحدد المسار القانوني وفق طبيعة العلاقة والالتزامات والطلبات، وبعد فحص الأوراق والوقائع.", ["دعاوى صحة ونفاذ العقود وفسخها أو بطلانها.", "المطالبة بالتعويض والحقوق المالية.", "منازعات تنفيذ العقود والإخلال بالالتزامات.", "المنازعات المتعلقة بالملكية أو الحيازة.", "منازعات الإيجارات."], "هذه أمثلة لموضوعات محتملة وليست تصنيفًا قانونيًا شاملًا. تحديد الدعوى وإجراءها يتطلب دراسة الملف."], en: ["Civil matters", "The appropriate approach depends on the relationship, obligations and requested relief, after examining the documents and facts.", ["Claims concerning contract performance, validity, rescission or nullity.", "Compensation and financial-rights claims.", "Contract-performance and alleged-breach disputes.", "Ownership or possession disputes.", "Tenancy disputes."], "These are examples, not an exhaustive legal classification. The appropriate claim and process require a case review."] },
    "commercial-cases": { ar: ["القضايا التجارية", "تتطلب المنازعات التجارية مراجعة علاقة الأطراف والاتفاقات والمراسلات والسجلات المتصلة بالنشاط.", ["المنازعات بين الشركات أو الشركاء.", "منازعات العقود التجارية والمطالبات المالية.", "منازعات التوريد والمقاولات والوكالات والتوزيع.", "منازعات الأوراق التجارية والنشاط التجاري."], "تكييف النزاع ومواعيد وإجراءات التعامل معه تحتاج إلى التحقق وفق المستندات والقواعد المنطبقة."], en: ["Commercial matters", "Commercial disputes call for review of the parties' relationship, agreements, correspondence and business records.", ["Disputes between companies or partners.", "Commercial agreements and payment claims.", "Supply, construction, agency and distribution disputes.", "Commercial instruments and business-activity disputes."], "Characterizing a dispute and identifying any procedural requirements require verification against the documents and applicable rules."] },
    "property-contracts": { ar: ["عقود بيع وشراء العقارات والأراضي", "تُراجع المعاملة للتأكد من وضوح محلها وشروطها والالتزامات المتبادلة والمستندات المشار إليها.", ["تحديد العقار والأرض ووصفهما ومستنداتهما.", "مراجعة الثمن وطريقة السداد وشروط التسليم.", "بيان التزامات الأطراف وإجراءات الإخلال أو إنهاء التعاقد."], "يجب مراجعة مستندات كل عقار وإجراءات الجهة المختصة؛ صياغة العقد وحدها لا تؤكد تسجيل الملكية."], en: ["Property and land sale and purchase agreements", "A transaction review considers whether the subject, terms, mutual obligations and referenced documents are clear.", ["Identifying and describing the property, land and supporting records.", "Reviewing consideration, payment terms and delivery.", "Clarifying obligations and the consequences of non-performance or termination."], "Property documents and relevant authority procedures must be reviewed for each transaction; an agreement alone does not establish registration."] },
    "property-documentation": { ar: ["فحص مستندات الملكية والموقف القانوني", "يجري فحص المستندات المتاحة لفهم سلسلة التصرفات والقيود أو المسائل التي تحتاج إلى استيضاح.", ["حصر مستندات الملكية والتصرفات المقدمة.", "مقارنة البيانات والأوصاف بين المستندات والعقد.", "تحديد ما يلزم طلبه أو التحقق منه لدى الجهة المختصة."], "لا يضمن الفحص اكتشاف كل معلومة غير متاحة أو ثبوت الملكية؛ ويعتمد على المستندات والسجلات التي أمكن مراجعتها."], en: ["Ownership documents & legal-status review", "Available documents can be reviewed to understand the transaction history and identify matters requiring clarification.", ["Cataloguing ownership and transaction documents provided.", "Comparing descriptions and details across documents and agreements.", "Identifying further records or verification to request from the competent authority."], "A review cannot guarantee that every unavailable record or issue is identified or establish title on its own; it is limited to accessible documents and records."] },
    "property-disputes": { ar: ["منازعات الملكية والحيازة والإيجارات", "تعتمد دراسة النزاع العقاري على طبيعة العلاقة والطلبات والمستندات والمراسلات ذات الصلة.", ["ترتيب الوقائع وتحديد أطراف العلاقة وصفة كل طرف.", "مراجعة عقود الإيجار والتصرفات والإخطارات المقدمة.", "مناقشة الخيارات القانونية ومسار التمثيل المناسب."], "تحديد الدعوى أو الإجراء يتوقف على تفاصيل كل حالة وتقييم المحكمة أو الجهة المختصة."], en: ["Ownership, possession & tenancy disputes", "Property disputes are assessed against the relationship, requested relief and relevant documents and correspondence.", ["Organizing the facts and identifying the parties and their roles.", "Reviewing lease agreements, transactions and notices provided.", "Discussing legal options and an appropriate representation strategy."], "The appropriate claim or step depends on each case and the competent authority's assessment."] },
    "property-industrial": { ar: ["الأراضي الصناعية والاستثمار العقاري", "مساندة قانونية في مراجعة العقود والمستندات والإجراءات المرتبطة بأرض صناعية أو بمشروع استثماري عقاري.", ["مراجعة مستندات الأرض والعقود المقترحة.", "تحديد المسائل المطلوب التحقق منها لدى الجهة المختصة.", "متابعة المستندات القانونية المرتبطة بالمشروع."], "تخصيص الأراضي والموافقات والتراخيص تخضع لاختصاص الجهات الرسمية وإجراءاتها، ولا يمكن ضمانها."], en: ["Industrial land & property investment", "Legal assistance with agreements, records and procedures relating to industrial land or a property-investment project.", ["Reviewing land documents and proposed agreements.", "Identifying matters to verify with the relevant authority.", "Following up on legal project documentation."], "Land allocation, approvals and licensing remain subject to official authorities and their procedures; no outcome can be guaranteed."] },
    "sales-contract": { ar: ["عقود البيع والإيجار", "تُراجع شروط محل التعاقد والقيمة والسداد والتسليم ومدة العلاقة والتزامات الأطراف.", ["تحديد الأطراف والشيء أو المنفعة محل الاتفاق.", "تنظيم الدفع والتسليم والصيانة أو المصروفات عند الاقتضاء.", "دراسة الإنهاء والإخطار ومعالجة الإخلال."], "يتطلب العقد العقاري مراجعة المستندات الخاصة بالملكية والوضع القانوني إلى جانب نص الاتفاق."], en: ["Sale & lease agreements", "Reviewing the subject, price and payment, delivery, duration and each party's obligations.", ["Identifying the parties and the property or benefit agreed.", "Addressing payment, delivery, maintenance or expenses as relevant.", "Considering termination, notice and remedies for non-performance."], "A real-estate agreement should be assessed alongside ownership records and the property's legal status."] },
    "partnership-contract": { ar: ["عقود الشراكة والشركات", "تنظم الاتفاقات بين الشركاء نطاق المساهمة والإدارة والحقوق والمسؤوليات وآليات التعامل عند الاختلاف.", ["تحديد الحصص والمساهمات وحقوق الإدارة.", "صياغة آليات القرار وتوزيع الأدوار والمسؤوليات.", "مراجعة شروط انتقال الحصص والخروج وتسوية الخلاف."], "تعتمد الصياغة على الشكل القانوني المختار والقواعد والوثائق المطبقة عليه."], en: ["Partnership & company agreements", "These agreements set out contributions, management, rights, responsibilities and how disagreement may be addressed.", ["Clarifying interests, contributions and management rights.", "Setting out decision-making, roles and responsibilities.", "Reviewing transfer, exit and dispute-handling terms."], "Drafting depends on the chosen legal form and the rules and documents applicable to it."] },
    "construction-contract": { ar: ["عقود المقاولات والتوريد", "تحديد نطاق العمل والمواصفات والتسليم والدفع والتغيير يساعد الأطراف على فهم التزاماتهم.", ["تفصيل نطاق الأعمال أو مواصفات المنتجات والكميات.", "تنظيم الجدول والتسليم والفحص والدفع.", "معالجة طلبات التغيير والإخلال وإنهاء الاتفاق."], "صياغة الالتزامات الفنية ينبغي أن تستند إلى مواصفات وملاحق واضحة يراجعها المختصون المعنيون."], en: ["Construction & supply agreements", "Defining scope, specifications, delivery, payment and variations helps parties understand their obligations.", ["Describing works, product specifications and quantities.", "Addressing schedule, delivery, inspection and payment.", "Considering variations, non-performance and termination."], "Technical obligations should be based on clear specifications and schedules reviewed by the relevant specialists."] },
    "services-contract": { ar: ["عقود الخدمات والوكالة", "تُراجع طبيعة الخدمة أو التفويض وحدوده والأجر والمدة والمسؤولية وآليات الإنهاء.", ["تعريف نطاق الخدمات أو سلطات الوكيل.", "تحديد المقابل والمصاريف ومسؤوليات كل طرف.", "تنظيم التقارير والمدة والإشعار بإنهاء العلاقة."], "يجب التأكد من ملاءمة التفويض وشروطه لطبيعة العلاقة والقواعد المنطبقة."], en: ["Services & agency agreements", "Reviewing the service or authority granted, its limits, fees, term, responsibilities and termination.", ["Defining the services or the agent's authority.", "Addressing compensation, expenses and each party's responsibilities.", "Setting out reporting, term and notice requirements."], "The authority and terms should be checked against the nature of the relationship and applicable requirements."] },
    "investment-contract": { ar: ["عقود الاستثمار والسرية", "تُراجع بنود التعاون المقترح ومعلومات المشروع وحماية المعلومات وحدود استخدامها.", ["تحديد نطاق الاستثمار والمساهمات المتفق عليها.", "مراجعة الشروط التجارية والتزامات الأطراف.", "صياغة اتفاقيات السرية بما يتناسب مع المعلومات والغرض."], "تختلف الملاءمة والحماية القانونية بحسب نص الاتفاق والقواعد المطبقة والوقائع."], en: ["Investment & confidentiality agreements", "Reviewing the proposed arrangement, project information, confidentiality and permitted use.", ["Defining the proposed investment and agreed contributions.", "Reviewing commercial terms and each party's obligations.", "Tailoring confidentiality terms to the information and purpose."], "Enforceability and suitability depend on the agreement's terms, applicable rules and circumstances."] },
    "settlement-contract": { ar: ["التسوية وعدم المنافسة", "توثيق ما يتفق عليه الأطراف يتطلب تحديد الالتزامات وآثار التسوية وأي قيود مقترحة.", ["صياغة التزامات التسوية وآلية تنفيذها.", "تحديد المطالبات التي يتناولها الاتفاق وحدوده.", "تقييم شروط عدم المنافسة وفق السياق والقانون المنطبق."], "لا يُفترض صلاحية شرط عدم المنافسة أو نفاذه دون مراجعة نطاقه ومدته وظروفه والقواعد السارية."], en: ["Settlement & non-compete agreements", "Documenting an agreement requires clarity about obligations, settlement effects and any proposed restrictions.", ["Setting out settlement obligations and implementation.", "Clarifying which claims the agreement addresses and its limits.", "Assessing non-compete terms in context and under applicable law."], "A non-compete restriction should not be assumed valid or enforceable without review of its scope, duration, circumstances and applicable rules."] },
    "investment-startup": { ar: ["تأسيس المشروعات", "دعم قانوني في بحث هيكل المشروع ومستنداته التأسيسية وعلاقته التعاقدية مع الأطراف.", ["مناقشة النشاط وهيكل الملكية والكيان الملائم.", "صياغة أو مراجعة عقود التأسيس والاتفاقات.", "متابعة إجراءات التأسيس لدى الجهة المختصة."], "اختيار الشكل ومتطلبات التأسيس يعتمدان على النشاط والقواعد الرسمية السارية."], en: ["Project formation", "Legal support to consider a project's structure, formation records and agreements with counterparties.", ["Discussing the activity, ownership and potentially suitable entity.", "Drafting or reviewing constitutive documents and agreements.", "Following formation procedures with the relevant authority."], "The suitable form and formation requirements depend on the activity and current official procedures."] },
    "investment-industrial": { ar: ["المشروعات الصناعية والأراضي", "مراجعة المستندات والاتفاقات المتعلقة بالمشروع الصناعي والأرض المخصصة له بحسب المعلومات المتاحة.", ["فحص عقود أو مستندات الأرض ذات الصلة.", "مراجعة الالتزامات القانونية بالعقود التجارية أو التشغيلية.", "تحديد ما يحتاج إلى تحقق من الجهة المختصة."], "التخصيص واستيفاء متطلبات الموقع أو التشغيل من اختصاص الجهات المعنية، ولا يضمن الدعم القانوني صدور الموافقات."], en: ["Industrial projects & land", "Reviewing documents and agreements for an industrial project and its land, within the information available.", ["Reviewing relevant land records or agreements.", "Considering legal obligations in commercial or operational contracts.", "Identifying matters to verify with relevant authorities."], "Allocation and site or operating requirements remain with competent authorities. Legal assistance cannot guarantee approval."] },
    "investment-approvals": { ar: ["الإجراءات والموافقات", "يمكن متابعة تجهيز المستندات القانونية وتقديمها ومتابعة الطلب لدى الجهات المختصة بحسب طبيعة النشاط.", ["تحديد الجهة ذات الصلة بالنشاط بحسب المعلومات المتاحة.", "مراجعة قائمة المستندات والمتطلبات المنشورة رسميًا.", "متابعة الطلبات والمراسلات ضمن نطاق التكليف."], "المتطلبات والمدد ونتائج الطلبات تعتمد على الجهة والإجراءات السارية؛ لا تُضمن الموافقة أو مدة الإنجاز."], en: ["Procedures & approvals", "Legal documents may be prepared and followed up with relevant authorities, depending on the proposed activity.", ["Identifying the relevant authority based on available activity information.", "Reviewing officially published document requirements.", "Following applications and correspondence within the agreed scope."], "Requirements, timelines and decisions depend on each authority and current procedure; approval and processing time cannot be guaranteed."] },
    "investment-growth": { ar: ["التوسع وخدمات ما بعد التأسيس", "مراجعة قانونية لتعديلات الشركة وعقودها عند تغير النشاط أو الملكية أو نطاق الأعمال.", ["تعديل مستندات الشركة أو بياناتها حيث يلزم.", "تحديث العقود والاتفاقات لتلائم التوسع.", "مراجعة مسائل الشراكة والاندماج أو التصفية عند الحاجة."], "يُحدد الإجراء وفق الشكل القانوني والجهة المختصة ومتطلبات الحالة."], en: ["Expansion & ongoing corporate services", "Legal review of company amendments and agreements as activity, ownership or business scope changes.", ["Amending company documents or records where required.", "Updating contracts and agreements for expansion.", "Considering partnership, merger or liquidation matters as needed."], "The appropriate process depends on the legal form, competent authority and circumstances."]
    },
    "library-company": {
      ar: ["ما قبل تأسيس النشاط: أسئلة تساعد على الاختيار", "يبدأ التخطيط القانوني للمشروع بجمع المعلومات عن النشاط والأطراف وطريقة التشغيل المتوقعة، لا باختيار اسم للشكل القانوني بمعزل عن باقي التفاصيل.", ["ما النشاط الفعلي، وأين سيُزاول؟", "من سيملك المشروع وكيف ستتوزع الأدوار وصلاحيات الإدارة؟", "هل ستتطلب طبيعة النشاط تراخيص أو موافقات من جهة معينة؟", "ما الوثائق والعقود التي ستنظم العلاقة مع الشركاء والعملاء والموردين؟", "تُراجع الخيارات ومتطلبات التأسيس المنشورة لدى الجهات الرسمية المختصة."], "هذه أسئلة أولية للتخطيط وليست توصية بشكل قانوني بعينه. تحقق من معلومات وإجراءات الهيئة العامة للاستثمار والمناطق الحرة (GAFI) والجهات المعنية قبل التقديم."],
      en: ["Before setting up a business: questions to consider", "Legal planning begins by understanding the activity, parties and proposed operations—not by choosing a business label without considering the detail.", ["What will the business do, and where will it operate?", "Who will own it, and how will roles and management authority be arranged?", "Could the activity require a licence or approval from a particular authority?", "Which agreements will govern relationships with partners, customers and suppliers?", "Check current formation requirements published by the relevant official authorities."], "These are planning questions, not a recommendation of a legal form. Verify GAFI guidance and requirements with relevant authorities before applying."]
    },
    "library-contracts": {
      ar: ["قراءة العقد: الالتزامات والاستثناءات", "قبل التوقيع، اقرأ العقد بوصفه وصفًا للعلاقة العملية بين الأطراف: ما الذي يلتزم به كل طرف، ومتى، وبأي شروط؟", ["حدد الأطراف والموضوع والمصطلحات المستخدمة.", "راجع نطاق العمل أو محل الاتفاق والالتزامات المتبادلة.", "افهم المبالغ ومواعيد الدفع وشروط التسليم.", "لاحظ حالات الإنهاء والتغيير وآلية تسوية الخلاف.", "قارن الملاحق والإحالات الواردة في النص."], "المراجعة اللغوية لا تكفي. يجب فهم النص الكامل والسياق والمستندات الملحقة قبل تكوين رأي بشأن التبعات."],
      en: ["Reading an agreement: obligations and exceptions", "Before signing, read the agreement as a description of the parties' working relationship: who must do what, when and on what terms?", ["Identify the parties, subject and defined terms.", "Review the scope and each party's obligations.", "Understand payment amounts, timing and delivery requirements.", "Note termination, variation and dispute-handling provisions.", "Check appendices and documents referenced in the agreement."], "A language edit alone is not a complete review. Legal implications depend on the full text, context and supporting documents."]
    },
    "library-property": {
      ar: ["قبل معاملة عقارية: المستندات والحقوق", "قبل التعاقد على عقار أو أرض، احرص على فهم وصف محل المعاملة وسندات الأطراف والمستندات التي يستند إليها الاتفاق.", ["احصر مستندات الملكية والتصرفات المتاحة.", "تحقق من تطابق وصف العقار بين العقد والمستندات.", "اسأل عن الحقوق أو الالتزامات أو القيود المشار إليها.", "اجعل شروط السداد والتسليم والإنهاء واضحة في الاتفاق.", "اطلب مراجعة متخصصة لما يتطلب تحققًا رسميًا."], "قائمة المستندات المطلوبة تختلف باختلاف العقار وطبيعة التعامل والجهة المختصة. لا يُعد الاطلاع على نسخة وحدها تأكيدًا للتسجيل أو الملكية."],
      en: ["Before a property transaction: documents and rights", "Before entering a property or land transaction, understand what is being transferred, the parties' authority and the documents supporting the agreement.", ["Collect available ownership and transaction documents.", "Compare the property's description across agreements and records.", "Ask about rights, obligations or restrictions mentioned in the documents.", "Clarify payment, delivery and termination terms.", "Seek specialist review of matters that require official verification."], "Document requirements vary by property, transaction and authority. Reviewing a copy alone does not confirm registration or establish ownership."]
    },
    "library-civil": {
      ar: ["عند نشوء نزاع: ترتيب الوقائع والمستندات", "تنظيم المعلومات قبل طلب المشورة يساعد على استعراض المسألة بدقة وفهم التسلسل الزمني للأحداث.", ["اكتب الوقائع المهمة وتواريخها بترتيب زمني.", "اجمع العقود والإخطارات والمراسلات وإثباتات السداد ذات الصلة.", "حدد أطراف النزاع وما تطلبه من كل طرف.", "احتفظ بالأصول ولا تعدل المستندات أو الرسائل.", "استشر محاميًا قبل اتخاذ خطوة قد تؤثر على موقفك."], "تختلف المدة والإجراءات الممكنة بحسب موضوع النزاع والوقائع والقواعد المنطبقة؛ لا تعتمد على وصف عام لتحديد الإجراء."],
      en: ["When a dispute arises: organizing facts and records", "Organizing information before seeking advice helps clarify what happened and when.", ["Write down important facts and dates in chronological order.", "Collect relevant contracts, notices, messages and proof of payment.", "Identify the parties and what you are seeking from each.", "Preserve original records and do not alter documents or messages.", "Consult a lawyer before taking a step that could affect your position."], "Possible steps and deadlines depend on the matter, facts and applicable rules. Do not rely on general information to determine procedure."]
    },
    "library-commercial": {
      ar: ["الخلاف التجاري: فهم الالتزام ومراسلات الأطراف", "في الخلاف التجاري قد تكون العلاقة موزعة بين عقد وملاحق وفواتير ومراسلات متبادلة؛ لذا يساعد جمعها معًا على فهم الالتزامات.", ["اجمع العقد والملاحق وأوامر الشراء أو مستندات التسليم.", "رتب الفواتير والمطالبات والدفعات بحسب التاريخ.", "احتفظ بالمراسلات التي تشرح التفاهم أو التغيير.", "حدد الالتزام المختلف عليه والإجراء الذي اتخذته الأطراف.", "اعرض الملف كاملًا على مختص قبل الرد الرسمي."], "هذا محتوى توعوي لا يحسم صحة مطالبة أو تفسير عقد؛ يجب مراجعة الوقائع والنصوص الكاملة."],
      en: ["A business disagreement: obligations and correspondence", "A commercial relationship can span a contract, appendices, invoices and correspondence. Collecting them together can clarify what was agreed.", ["Gather the agreement, appendices, orders and delivery records.", "Organize invoices, claims and payments by date.", "Preserve communications that explain an understanding or change.", "Identify the disputed obligation and steps each party has taken.", "Have the complete file reviewed before making a formal response."], "This article does not determine the validity of a claim or the interpretation of a contract; full facts and terms need review."]
    },
    "library-investment": {
      ar: ["المشروع الاستثماري: أسئلة قانونية تمهيدية", "يمكن للتخطيط المبكر أن يوضح المستندات والعلاقات والجهات التي ينبغي أخذها في الحسبان قبل بدء النشاط.", ["ما النشاط وموقع ممارسته والكيان الذي سيزاوله؟", "ما عقود المشروع الرئيسية والأطراف المعنيون بها؟", "هل يوجد عقار أو أرض أو عقد انتفاع مرتبط بالمشروع؟", "ما الموافقات التي تشير إليها المصادر الرسمية للنشاط؟", "كيف ستدار التغييرات أو الشراكات مستقبلًا؟"], "المتطلبات تتغير بحسب النشاط والموقع والجهة. تُراجع المصادر الرسمية مباشرة، ولا تمثل هذه الأسئلة تأكيدًا بوجوب ترخيص محدد."],
      en: ["Investment projects: preliminary legal questions", "Early planning may help identify documents, relationships and authorities to consider before business operations begin.", ["What is the activity, where will it operate and through which legal entity?", "What are the project's key agreements and counterparties?", "Does the project involve real estate, land or a use agreement?", "What approvals do official sources identify for the activity?", "How will future changes or partnerships be managed?"], "Requirements vary by activity, location and authority. Consult official sources directly; these questions do not confirm that any specific licence is required."]
    },
    "legal-documents": {
      ar: ["الإنذارات والمذكرات والطلبات القانونية", "إعداد مستند قانوني يتصل بالوقائع والإجراء المقصود، مع توضيح الأطراف والطلبات والمستندات الداعمة.", ["مراجعة المعلومات والمراسلات والوثائق المقدمة.", "صياغة الإنذارات والمذكرات والطلبات ضمن نطاق التكليف.", "مراجعة وضوح الوقائع والطلبات وإرفاق ما يلزم من مستندات.", "مراعاة الجهة أو الإجراء الذي سيُقدم إليه المستند."], "تختلف متطلبات المستند وصيغته بحسب الغرض والجهة والإجراء، ولا يعني إعداده قبول الطلب أو تحقق أثر معين."],
      en: ["Notices, memoranda & legal applications", "Preparing a legal document in light of the facts and intended process, identifying the parties, requests and supporting documents.", ["Reviewing the information, correspondence and records provided.", "Preparing notices, memoranda and applications within the agreed scope.", "Checking that facts and requests are clear and supporting records are addressed.", "Considering the authority or procedure to which the document will be submitted."], "Document requirements and formats vary by purpose, authority and process. Preparation does not guarantee acceptance or a particular result."]
    },
    representation: {
      ar: ["التمثيل أمام الجهات والمحاكم المختصة", "تمثيل قانوني في حدود طبيعة المسألة والمرحلة الإجرائية، بعد بحث الوقائع والمستندات والتكليف.", ["مراجعة ملف المسألة والطلبات والإجراءات السابقة.", "شرح نطاق التمثيل والمستندات والمعلومات اللازمة.", "متابعة المسألة أمام الجهة أو المحكمة المختصة وفقًا للتكليف.", "إطلاع العميل على التطورات والمتطلبات الإجرائية ذات الصلة."], "تحديد الاختصاص أو قبول التمثيل أو الخطوات الإجرائية يتطلب تقييم ظروف كل حالة ولا يضمن نتيجة محددة."],
      en: ["Representation before competent authorities & courts", "Legal representation suited to the matter and procedural stage, after reviewing the facts, documents and engagement.", ["Reviewing the file, requests and prior procedural steps.", "Explaining the scope of representation and needed records and information.", "Following the matter with the relevant authority or court within the agreed scope.", "Keeping the client informed of relevant developments and procedural requirements."], "Jurisdiction, acceptance of representation and next steps require a case-specific assessment and do not guarantee an outcome."]
    },
    "library-legislation": {
      ar: ["كيف تتحقق من مصدر المعلومة القانونية؟", "يمكن أن تتغير القواعد والإجراءات، وقد يختصر النقل غير الرسمي النص أو يخرجه من سياقه. التحقق يبدأ بمصدر رسمي وبقراءة النص المتصل بالمسألة كاملة.", ["ابحث عن النص أو الإجراء في موقع الجهة الرسمية المختصة.", "تحقق من تاريخ النشر وما إذا وُجدت تحديثات أو تعديلات لاحقة.", "اقرأ النص كاملًا، بما في ذلك التعريفات والاستثناءات والإحالات.", "ميّز بين المعلومات الإرشادية العامة وبين النص الملزم.", "استعن بمحامٍ لتطبيق النص على وقائع ومستندات الحالة."], "هذا المقال لا يورد تفسيرًا لنص قانوني ولا يحدد تشريعًا بعينه؛ المعلومات الرسمية واجبة التحقق وقت الحاجة."],
      en: ["How to check the source of legal information", "Rules and procedures can change, and unofficial summaries may omit important context. Verification starts with an official source and the full text relevant to the issue.", ["Look for the rule or procedure on the competent authority's official website.", "Check the publication date and look for subsequent amendments or updates.", "Read the complete text, including definitions, exceptions and cross-references.", "Distinguish general guidance from binding provisions.", "Ask a lawyer how a current rule applies to specific facts and documents."], "This article does not interpret or cite a particular law. Official information should be verified at the time it is needed."]
    },
    "library-consultation": {
      ar: ["كيف تستعد لاستشارة قانونية أولى؟", "عرض واضح وموجز للوقائع يساعد على توجيه النقاش وتحديد المعلومات التي ما زالت مطلوبة.", ["اكتب تسلسل الأحداث والتواريخ المهمة.", "اذكر أطراف المسألة وأدوارهم ووسائل التواصل المتاحة.", "جهز العقد والمراسلات والإخطارات والمستندات ذات الصلة.", "حدد ما ترغب في معرفته أو الوصول إليه من الاستشارة.", "اذكر أي مواعيد أو إجراءات وشيكة دون افتراض انطباق مدة قانونية."], "لا ترسل مستندات حساسة أو معلومات شخصية عبر قنوات عامة؛ ناقش طريقة آمنة لمشاركة الملفات مع المكتب."],
      en: ["How to prepare for an initial legal consultation", "A clear, concise account of events can focus the discussion and identify any missing information.", ["Write down the sequence of events and important dates.", "Identify the parties, their roles and available contact details.", "Gather relevant agreements, correspondence, notices and supporting documents.", "Set out what you need to understand or achieve from the consultation.", "Mention any upcoming dates or proceedings without assuming a legal deadline applies."], "Do not send sensitive documents or personal information through public channels; ask the office about a suitable way to share files."]
    }
  };

  const getLang = () => root.lang === "en" ? "en" : "ar";
  const text = (key) => copy[getLang()][key] ?? key;

  function setLanguage(language) {
    const nextLanguage = language === "en" ? "en" : "ar";
    const isEnglish = nextLanguage === "en";
    root.lang = nextLanguage;
    root.dir = isEnglish ? "ltr" : "rtl";
    document.title = isEnglish
      ? "Islam Atef Shreef Law Firm | Attorney at Law & Legal Consultant"
      : "مكتب المحامي إسلام عاطف شريف | ISLAM ATEF SHREEF LAW FIRM";
    document.querySelector('meta[name="description"]').content = isEnglish
      ? "Islam Atef Shreef Law Firm provides legal services and consultations for individuals, companies and investors in 10th of Ramadan City, Sharqia, Egypt."
      : "مكتب المحامي إسلام عاطف شريف: خدمات واستشارات قانونية للأفراد والشركات والمستثمرين في العاشر من رمضان والشرقية، مصر.";
    document.querySelector('meta[property="og:locale"]').content = isEnglish ? "en_US" : "ar_EG";
    document.querySelector('meta[property="og:title"]').content = isEnglish
      ? "Islam Atef Shreef Law Firm | Attorney at Law"
      : "مكتب المحامي إسلام عاطف شريف | ISLAM ATEF SHREEF LAW FIRM";
    document.querySelector('meta[property="og:description"]').content = isEnglish
      ? "Legal expertise. Practical solutions. Legal services for individuals, companies and investors in Egypt."
      : "خبرة قانونية .. لحلول واقعية. خدمات قانونية للأفراد والشركات والمستثمرين في مصر.";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translated = text(key);
      if (element.dataset.i18nHtml !== undefined) {
        element.innerHTML = translated;
      } else {
        element.textContent = translated;
      }
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      element.setAttribute("aria-label", text(element.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.placeholder = text(element.dataset.i18nPlaceholder);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      element.alt = text(element.dataset.i18nAlt);
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.title = text(element.dataset.i18nTitle);
    });

    document.querySelector(".language-active").textContent = isEnglish ? "EN" : "ع";
    languageButton.setAttribute("aria-pressed", String(isEnglish));
    document.querySelectorAll('[data-i18n="addressAr"], [data-i18n="locationAddressAr"]').forEach((element) => {
      element.hidden = isEnglish;
    });
    document.querySelectorAll('[data-i18n="addressEn"], [data-i18n="locationAddressEn"]').forEach((element) => {
      element.hidden = !isEnglish;
    });
    formStatus.replaceChildren();
    if (currentDetail) renderDetail(currentDetail);
    menuButton.setAttribute("aria-label", text(menuButton.getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"));
    try {
      localStorage.setItem("islam-shreef-language", nextLanguage);
    } catch (error) {
      if (error.name !== "SecurityError" && error.name !== "QuotaExceededError") throw error;
    }
  }

  function renderDetail(key) {
    const detail = details[key];
    if (!detail) return;
    const [title, description, points, note] = detail[getLang()];
    dialogTitle.textContent = title;
    dialogDescription.textContent = description;
    dialogNote.textContent = note;
    const isFounderProfile = key === "founder-profile";
    dialogProfileImage.hidden = !isFounderProfile;
    dialogRole.hidden = !isFounderProfile;
    if (isFounderProfile) dialogRole.textContent = text("founderTitle");
    dialogList.replaceChildren(...points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    }));
  }

  function openDetail(key) {
    if (!details[key]) return;
    currentDetail = key;
    renderDetail(key);
    if (!dialog.open) dialog.showModal();
  }

  document.querySelector("#current-year").textContent = String(new Date().getFullYear());
  let initialLanguage = "ar";
  try {
    if (localStorage.getItem("islam-shreef-language") === "en") initialLanguage = "en";
  } catch (error) {
    if (error.name !== "SecurityError") throw error;
  }
  setLanguage(initialLanguage);

  languageButton.addEventListener("click", () => setLanguage(getLang() === "ar" ? "en" : "ar"));
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-detail]");
    if (trigger) openDetail(trigger.dataset.detail);
  });
  const galleryTitle = document.querySelector("#portfolio-category-title");
  document.querySelector(".portfolio-categories").addEventListener("click", (event) => {
    const category = event.target.closest("[data-gallery]");
    if (!category) return;
    document.querySelectorAll("[data-gallery]").forEach((button) => {
      const selected = button === category;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    galleryTitle.dataset.i18n = galleryKeys[category.dataset.gallery];
    galleryTitle.textContent = text(galleryKeys[category.dataset.gallery]);
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".dialog-language").addEventListener("click", () => setLanguage(getLang() === "ar" ? "en" : "ar"));
  dialog.querySelector(".dialog-cta").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => { currentDetail = ""; });

  function closeNavigation() {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", text("menuOpen"));
    document.body.classList.remove("nav-open");
  }
  menuButton.hidden = false;
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeNavigation();
    } else {
      navigation.classList.add("is-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", text("menuClose"));
      document.body.classList.add("nav-open");
    }
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) closeNavigation();
  });
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });
  header.classList.toggle("is-scrolled", window.scrollY > 24);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) {
      formStatus.textContent = text("formInvalid");
      return;
    }
    const data = new FormData(form);
    const isEnglish = getLang() === "en";
    const serviceName = form.elements.service.selectedOptions[0].textContent;
    const message = isEnglish
      ? `Consultation request\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nService: ${serviceName}\nMessage: ${data.get("message")}`
      : `طلب استشارة قانونية\nالاسم: ${data.get("name")}\nرقم الهاتف: ${data.get("phone")}\nالخدمة المطلوبة: ${serviceName}\nالرسالة: ${data.get("message")}`;
    const whatsAppUrl = `https://wa.me/201011628489?text=${encodeURIComponent(message)}`;
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
    const fallback = document.createElement("a");
    fallback.href = whatsAppUrl;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = text("formFallback");
    formStatus.replaceChildren(document.createTextNode(`${text("formReady")} `), fallback);
  });

  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: "0px 0px -30px 0px" });
    revealElements.forEach((element) => observer.observe(element));
  }
})();
