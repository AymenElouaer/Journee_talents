import React, { useState, useRef } from "react";
import "./TermsAndConditions.css";



const TermsAndConditions = ({ onClose, setFormData, onAccept }) => {
    const [showButton, setShowButton] = useState(false);
    const scrollContainerRef = useRef(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;

        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 3) {
            setShowButton(true);
        }
    };
    const handleAccept = () => {
        // Update acceptedTerms in the parent form data
        setFormData(prevFormData => ({
            ...prevFormData,
            acceptedTerms: true
        }));

        if (onAccept) {
            onAccept();   // Trigger the registration logic
        }
    };

    return (
        <div className="outer-container">
            <div className="terms-container">
                <div
                    className="terms-text"
                    onScroll={handleScroll}
                    ref={scrollContainerRef}
                >
                    <h1 className="terms-title">
                        Politique de confidentialité et de protection des renseignements personnels « Journées Talents »
                    </h1>
                    <p>
                        Nous vous remercions de visiter le site Journées Talents, une initiative d’intermédiation mondiale
                        payante de la société BSFA GROUP à but lucratif ainsi qu’une initiative d’intermédiation ou
                        d’investissement aux ressources humaines et aux idées des projet par financement, appelé la
                        programmation des Bourses Privée via Bourses d’études ou Bourses de stages, et nous vous invitions à
                        prendre connaissance de sa Politique de confidentialité et de protection des renseignements
                        personnels (Politique), qui vous applicable.
                    </p>
                    <h2>Définitions</h2>
                    <h3>Activité</h3>
                    <p>
                        Mot utilisé pour désigner les Journées Talents, un évènement de rapprochement de contact entre les
                        recruteurs et les candidats ou entre les investisseurs et les candidats dans le monde organisé par
                        BSFA GROUP sous le nom des Journées Talents et qui se déroule dans des espaces virtuelles ou
                        physiques durant une période donnée ou à fixer sous réserve de décision d’admissibilité par
                        l’organisateur. L’activité rassemble des personnes candidates, des employeuses et employeurs, des
                        recruteuses et recruteurs, des partenaires et des corps gouvernementaux ou non gouvernementaux ;
                    </p>
                    <h3>Candidat</h3>
                    <p>
                        Un candidat ou une candidate est une personne ayant 16 ans et plus qui se crée un compte/profil sur
                        la plate-forme Journées Talents dans le but de poser sa candidature dans un espace virtuel
                        conformément à une programmation spécifique.
                        PS :

                    </p>
                    <ul>
                        <li>La création du compte soit gratuite.</li>
                        <li>La demande d’éligibilité via une inscription à une programmation spécifique soit gratuite.</li>
                        <li>Le rendez-vous de l’entretien soit payant.</li>
                        <li>Les frais de l’inscription payé au moment de réservation du rendez-vous soient ni endossables ni
                            remboursables.
                        </li>
                        <li>Les résultats et les décisions ne soient pas justifiés ou argumentés par un motif de refus ou
                            autres ni soumises à une contestation ni administrative ni judiciaire.
                        </li>
                        <li>Les frais de l’inscription ne peut être remboursable que si et seulement si le candidat a été
                            sélectionné définitivement conformément au parcours de sélection Journées Talents et que la
                            mission a été annulée par l’organisateur dont cette annulation ne peut pas être considéré comme
                            force majeure.
                        </li>
                    </ul>
                    <h3>Employeur</h3>
                    <p>Une employeuse ou un employeur est une personne physique ou morale. Il s’inscrit au présent site pour
                        pouvoir accéder aux candidatures et profils concernées après traitement et sous conditions liés au
                        module sujet de la participation.</p>
                    <h3>Journées Talents </h3>
                    <p>Journées Talents est une initiative privée à but lucratif de BSFA GROUP conçue à l’attention des
                        employeuses et employeurs, des recruteuses et recruteurs, des investisseurs, des partenaires et des
                        corps gouvernementaux et non gouvernementaux.</p>
                    <p>Elle permet aux personnes candidates inscrites de faire connaître leur candidature, de manifester
                        leur intérêt à des opportunistes dans des pays donnés et d’offrir la possibilité de rencontrer
                        physiquement ou virtuellement des employeuses et employeurs et des recruteuses et recruteurs dans le
                        monde sur les lieux de l’activité une fois admissible.</p>
                    <p>Elle permet aux personnes candidates inscrites d’avoir un financement de parcours académique dans le
                        cadre de l’investissement aux ressources humaines de la société mère ou de ses partenaires
                        conformément à une programmation des Bourses Privées soumises à des conditions.</p>
                    <p>Elle permet aux personnes candidates inscrit d’avoir un financement de stage d’études dans le cadre
                        de l’achat des idées des projets par financement de réalisation de la société mère ou de ses
                        partenaires conformément à une programmation des Bourses Privées soumises à des conditions.</p>
                    <h3>Collaborateur</h3>
                    <p>Une ou un collaborateur est un organismes public local d’un territoire visé par Journées Talents qui
                        a notamment pour l’employabilité, les études, la recherche scientifique ou autres. Le collaborateur
                        fait la promotion de l’activité dans son réseau.</p>
                    <p>A titre exemple des types des corps pouvons être collaborateur dans le monde, sous réserve de dépose
                        d’une demande officielle de collaboration soumise à une décision de validation ou refus par les
                        autorités concernés de la société mère, sont :
                        l’Agence Tunisienne de Coopération Technique (ATCT) (Tunisie), Pôle-Emploi (France), l’Agence
                        nationale de promotion de l’emploi et des compétences (ANAPEC) (Maroc), le Servico Nacional de
                        Aprendizaje (SENA) (Colombie), l’Agence nationale pour la promotion de l’emploi des jeunes (ANPEJ)
                        (Sénégal), le Servicio Nacional de Empleo (SNE) (Mexique), Office français de l’integration des
                        immigrés (OFII) ect..
                    </p>
                    <p>Centre National de la recherche scientifique (CNRS), Troubles Envahissants du Développement (TED),
                        Commissariat à l’énergies atomique et aux énergies alternatives (CEA), Institut National de la
                        Recherche Agronomique et de l’Environnement (INRAE), Campus France, Portail de l’industrie
                        Tunisienne (API), ect..</p>
                    <h3>Investisseur ou Partenaire </h3>
                    <p>Un investisseur ou partenaire est par défaut la société mère organisatrice des Journées Talents dans
                        le cadre de l’investissement et réinvestissements de l’entreprise comme il peut être aussi les
                        institutions financières ou des bourses ou sociétés privées ou public local ou internationale qui
                        visent investir dans le cadre de la programmation Bourses Privées.</p>
                    <p>A titre exemple des types des corps pouvons être Partenaire ou Investisseur dans le monde, sous
                        réserve de dépose d’une demande officielle de partenariat ou invité d’honneur entant que «
                        investisseur » soumise à une décision de validation ou refus par les autorités concernées de la
                        société mère, sont :
                        JBS Brésil, Coca-Cola USA, Lactalis FRANCE, Nestlé SUISSE, Orange, SFR, Proximus, ING Bank,
                        Boursorama, Société Générale, MBank, WeBank, i2Bank, VRD Belgique, DL-Group, BYD, Samsung, Huawei,
                        PFIZER, Hilton, HP, MSI, ect..
                    </p>
                    <h3>Recruteur</h3>
                    <p>Une recruteuse ou un recruteur est une société spécialisée dans le recrutement de travailleuse et de
                        travailleur. Elle possède un siège social dans le pays X de la Journée X.</p>
                    <h3>Renseignement personnel </h3>
                    <p>Un renseignement qui concerne une personne physique et qui permet de l’identifier.</p>
                    <h3>Représentant </h3>
                    <p>Une représentante ou un représentant est une personne qui représente une recruteuse ou un recruteur
                        ou un partenaire ou un collaborateur ou un investisseur ou qui agit au nom d’une employeuse ou un
                        employeur ou un partenaire ou un collaborateur ou un investisseur ;</p>
                    <h3>Plate-forme Journées Talents </h3>
                    <p>la plate-forme Journées Talents est la propriété d’une entreprise privée. Elle est développée et
                        contrôlée par le propriétaire et permet aux divers types de personnes utilisatrices (employeuses,
                        employeurs, recruteuses, recruteur, candidates, candidats, etc.) de s’y inscrire et l’utiliser</p>
                    <h3>Utilisateur </h3>
                    <p>Toute personne, dont celle qui est candidate, ou partenaire ou autres ayant recourt au site web ou
                        application mobile Journées Talents afin de participer ou non à une programmation</p>
                    <h2>Étendue de la Politique</h2>
                    <p>La présente Politique s’applique aux sites et applications mobiles Journées Talents, qui est
                        développé, détenu et contrôlé par la société mère. Ce dernier est soumis à la Loi sur l’accès aux
                        documents des organismes privées et sur la protection des renseignements personnels. Ainsi, en
                        conformité avec cette loi, la société mère doit s’identifier, s’assurer que les renseignements
                        personnels qu’il recueille sont nécessaires à l’exercice de ses attributions et vous informer de vos
                        droits.</p>
                    <h2>Renseignements Recueillis Automatiquement</h2>
                    <p>Vous devez savoir que dès que vous accédez au site ou application Journées Talents, un certain nombre
                        des renseignements sont échangés automatiquement entre votre ordinateur et les serveurs du
                        propriétaire, et ce, sans que vous ayez à intervenir.</p>
                    <p>Cet échange d’information est nécessaire pour que le fichier transmis par nos serveurs soit compatible avec l’équipement informatique que vous utilisez. La société mère conserve par ailleurs l’information requise pour comptabiliser le nombre de visiteurs, les pages les plus fréquentées, la technologie utilisée par la clientèle du site, les sites de référencement et le pays d’origine des personnes utilisatrices.
                        Cependant, quelques informations pouvant être recueillie telle que :
                        . Le nom, adresse, l’adresse IP et le domaine Internet utilisés pour accéder à ce site ;
                        . Le type et version du navigateur et du système d’exploitation utilisé ;
                        . Le site Web d’où vous venez (quand vous avez cliqué sur un lien menant à ce site).</p>
                    <p>Ces données sont recueillies sans l’utilisation de témoin de connexion, (cookies) ou de fichiers témoins permanents. Elles servent uniquement à des fins de statistiques et nous permettent, entre autres, de savoir quelles pages ont été consultées, pendant combien de temps et dans quel ordre. Ces informations transmises automatiquement sont anonymisées et ne permettent pas de vous identifier. Elles ne sont recueillies qu’en raison des exigences technologiques inhérentes à la navigation sur le Web. Ces données sont conservées conformément au calendrier de conservation de la société mère.</p>
                    <h2>Utilisation de vos Renseignements Personnels</h2>
                    <p>Nous utilisons les renseignements personnels que nous recueillons dans la plate-forme Journées Talents afin d’analyser et de jumeler de façon optimale les navigateurs inscrits aux sites ou applications.
                        En créant votre compte/profil sur la plate-forme Journées Talents, vous autorisez la société mère d’utiliser vos renseignements personnels que vous nous aurez transmis pour :
                        Evaluer votre éligibilité ou votre admissibilité ou autres.
                        Vous contacter pour vous faire part des nouvelles étapes, activités, résultats dans le cadre du concept de l’activité de plate-forme ou d’autres activités gérées par la société mère ou ses associés directement ou indirectement.
                        Vous invitez à participer à des études (sondages, groupes de discussion, ect.) réalisées par la société mère afin d’améliorer la qualité de ses services ;
                        Vous contacter pour des promotions ou actions marketing ou publicitaires ou d’autres activités gérées uniquement par la société mère ou ses partenaires officielles.
                        Vous fournir des communications ou de l’information additionnelle telle que des bulletins d’informations ;
                        Produire des rapports relatifs à l’utilisation de notre site Web ou aux résultats réalisées dans le cadre de notre activité.
                    </p>
                    <h2>Conservation de vos Renseignements Personnels</h2>
                    <p>Les renseignements personnels contenus dans votre compte Journées Talents seront conservés, et ce, tant que votre compte sera actif.
                        Pour ce qui est compte inactifs, comme les comptes n’ayant eu aucune activité durant une période bien déterminée (souvent fixée par deux ans par le propriétaire du site) ou compte supprimé par décision de la société mère, ces derniers seront conservés pour une propriété absolue de BSFA Group ou ils seront détruits.
                    </p>
                    <h2>Mesures de Sécurité</h2>
                    <p>Il vous appartient de vous assurer que vos données de connexion (nom de la personne utilisatrice et mot de passe) demeurent confidentielles.
                        La société a mis en place, sur le plan technique et organisationnel, des mesures de sécurité appropriées conçues pour protéger vos renseignements personnels contre toute perte accidentelle ou contre tout accès, utilisation, altération ou diffusion non autorisées.
                    </p>
                    <h2>Communication</h2>
                    <p>Si vous avez des questions concernant la présente politique ou si vous éprouvez un problème technique lors de l’utilisation de la plate-forme Journées Talents, vous pouvez communiquer avec nous en utilisant le formulaire prévu à cet effet.
                        Un suivi sera fait dans les meilleurs délais afin de répondre à vos questions ou résoudre vos problèmes techniques.
                        Les résultats d’éligibilités, de sélection, d’admissibilité et des candidatures pris par le comité d’évaluation des différentes techniques d’évaluations telle que celles basées sur l’intelligence artificielle ou humaines ne sont pas soumises à des contestations ni administratives ni judiciaires.
                    </p>
                    <h2>MODIFICATIONS APPORTEES A LA POLITIQUE DE CONFIDENTIALITE ET DE PROTECTION DES RENSEIGNEMENTS PERSONNELS</h2>
                    <p>Advenant la modification de la présente Politique, vous en serez informé dès votre première connexion qui suivra sa modification et il sera demandé d’en prendre connaissance et de l’accepter.</p>
                    <h2>Non-Responsabilité</h2>
                    <p>La société mère n’est pas responsable de la fiabilité des informations reproduites dans la plate-forme Journées Talents et quant aux résultats découlant de l’utilisation de telles informations.
                        De plus, la société mère ne fournit aucune garantie en ce qui concerne l’exactitude, la fiabilité ou le continu de l’information transmises par les personnes utilisatrices de la plate-forme Journées Talents ainsi que la ponctualité de la programmation ou la mission proposées. La société mère se réserve le droit de modifier, de limiter ou de supprimer toute donnée mise en ligne sur la plate-forme Journées Talents. La société mère se dégage de toute responsabilité pour les pertes, dommages ou frais qui résulteraient de l’utilisation des informations mises en ligne y compris, et sans limitation, toute faute, toute erreur, toute omission, toute interruption ou tout délai.
                        Également, le fait que des liens vers des sites web externes soient fournis ne signifie pas que la société mère partage les opinions de leur auteure ou auteur. Par conséquent, la société mère ne peut, en aucun cas, être tenu responsable des idées, des opinions et des données, quelles qu’elles soient, disponibles dans ces sites ou applications. Les liens externes sont indiqués dans le seul but de permettre à la personne utilisatrice de trouver un complément d’information
                    </p>
                    <h2>Liens Vers d’Autres Sites</h2>
                    <p>La plate-forme Journées Talents propose des liens vers d’autres sites Web des établissements privées ou gouvernementaux. Lorsque vous quittez Journées Talents, vous n’êtes plus assujettis à la présente Politique.</p>
                </div>
                {showButton && (
                    <button
                        className="accept-button"
                        onClick={handleAccept}
                    >
                        Accepter
                    </button>
                )}
            </div>
        </div>
    );
};

export default TermsAndConditions;
