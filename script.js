// 🎓 BTS SIO SLAM - QUIZ INTERACTIFS SPF/DKIM/DMARC
// Script JavaScript pour la gestion des quiz randomisés

// Configuration des quiz avec questions et réponses équilibrées en longueur
const quizData = {
    1: {
        title: "Le problème et l'impact",
        questions: [
            {
                question: "Pourquoi peut-on recevoir un faux email de sa banque ?",
                answers: [
                    { text: "Parce que sur internet, n'importe qui peut mentir sur l'expéditeur d'un email", correct: true },
                    { text: "Parce que les banques utilisent des serveurs obsolètes", correct: false },
                    { text: "Parce que les pirates peuvent facilement pirater les serveurs des banques et usurper l'identité", correct: false },
                    { text: "Parce que les fournisseurs d'accès internet ne vérifient jamais l'authenticité", correct: false }
                ],
                explanation: "Sur internet, il est très facile de mentir sur l'expéditeur d'un email. C'est comme utiliser une fausse carte d'identité : techniquement possible, mais illégal et dangereux pour celui qui reçoit."
            },
            {
                question: "Que permet SPF de faire en termes simples ?",
                answers: [
                    { text: "De publier la liste des serveurs autorisés à envoyer des emails pour un domaine", correct: true },
                    { text: "De chiffrer tous les emails", correct: false },
                    { text: "De bloquer définitivement tous les emails provenant de domaines suspects ou considérés comme malveillants", correct: false },
                    { text: "De scanner le contenu des emails pour détecter les virus", correct: false }
                ],
                explanation: "SPF (Sender Policy Framework) permet de dire publiquement : 'Voici la liste des serveurs qui ont le droit d'envoyer des emails au nom de mon domaine'. C'est comme une liste d'invités VIP."
            },
            {
                question: "Quel est l'impact d'un email frauduleux pour une entreprise ?",
                answers: [
                    { text: "Perte de confiance des clients et dégradation de la réputation", correct: true },
                    { text: "Perte de clients", correct: false },
                    { text: "Augmentation automatique des coûts d'infrastructure informatique et de maintenance des serveurs", correct: false },
                    { text: "Ralentissement des performances des serveurs", correct: false }
                ],
                explanation: "Si des pirates envoient de faux emails au nom d'une entreprise, les clients vont perdre confiance et se méfier de TOUS les emails de cette entreprise, même les vrais. C'est l'impact le plus grave."
            },
            {
                question: "Qu'arrive-t-il aux emails de votre app web sans protection SPF ?",
                answers: [
                    { text: "Ils risquent fortement de finir en spam", correct: true },
                    { text: "Ils sont bloqués", correct: false },
                    { text: "Ils sont automatiquement chiffrés par les serveurs de messagerie destinataires pour des raisons de sécurité", correct: false },
                    { text: "Ils sont redirigés vers un serveur de quarantaine pendant 48 heures", correct: false }
                ],
                explanation: "Sans protection SPF, les serveurs email destinataires ne savent pas si vos emails sont légitimes. Par précaution, ils les classent souvent en spam, ce qui casse les fonctionnalités de votre application."
            },
            {
                question: "Pourquoi les développeurs web doivent-ils connaître SPF/DKIM/DMARC ?",
                answers: [
                    { text: "Parce que leurs applications envoient des emails qui doivent arriver à destination", correct: true },
                    { text: "Pour configurer les serveurs", correct: false },
                    { text: "Parce qu'ils doivent obligatoirement configurer eux-mêmes tous les serveurs de messagerie de l'entreprise", correct: false },
                    { text: "Parce que la loi exige qu'ils soient certifiés en cybersécurité", correct: false }
                ],
                explanation: "Les applications web envoient souvent des emails (confirmations, mots de passe oubliés...). Si ces emails finissent en spam à cause de protections manquantes, les fonctionnalités de l'app sont cassées !"
            }
        ]
    },
    2: {
        title: "SPF et protection de base",
        questions: [
            {
                question: "Que signifie un SPF record finissant par '~all' ?",
                answers: [
                    { text: "Soft fail : les autres serveurs sont suspects mais pas bloqués", correct: true },
                    { text: "Hard fail automatique", correct: false },
                    { text: "Autorisation explicite pour tous les serveurs de messagerie existants sur internet et les sous-domaines", correct: false },
                    { text: "Activation du mode de compatibilité avec les anciens protocoles", correct: false }
                ],
                explanation: "Le '~all' en fin de SPF signifie 'soft fail' : les emails venant d'autres serveurs sont marqués comme suspects mais pas automatiquement rejetés. C'est plus souple que '-all' (hard fail)."
            },
            {
                question: "Où doit être publié l'enregistrement SPF dans le DNS ?",
                answers: [
                    { text: "Dans un enregistrement TXT du domaine", correct: true },
                    { text: "Dans un enregistrement de type MX (Mail eXchanger) avec priorité maximale et configuration redondante", correct: false },
                    { text: "Dans un enregistrement CNAME", correct: false },
                    { text: "Dans un enregistrement de type A associé à l'adresse IP", correct: false }
                ],
                explanation: "SPF est publié dans un enregistrement TXT du DNS. C'est un format texte simple que tout le monde peut consulter pour vérifier les règles d'envoi d'emails du domaine."
            },
            {
                question: "Quel est le problème des forwards email avec SPF ?",
                answers: [
                    { text: "Le serveur de forward n'est pas dans la liste SPF originale", correct: true },
                    { text: "Les emails forwardés perdent automatiquement leur signature cryptographique DKIM et toutes les métadonnées", correct: false },
                    { text: "Les serveurs de forward ne supportent pas les protocoles modernes", correct: false },
                    { text: "Aucun problème avec SPF", correct: false }
                ],
                explanation: "Quand un email est forwardé, il vient maintenant du serveur de forward, qui n'est souvent pas dans la liste SPF du domaine original. C'est un défi technique courant avec SPF."
            },
            {
                question: "Combien d'enregistrements SPF maximum par domaine ?",
                answers: [
                    { text: "Un seul", correct: true },
                    { text: "Trois maximum pour éviter les conflits de configuration entre les différents serveurs de messagerie", correct: false },
                    { text: "Cinq enregistrements", correct: false },
                    { text: "Pas de limite", correct: false }
                ],
                explanation: "Un domaine ne peut avoir qu'un seul enregistrement SPF valide. Avoir plusieurs enregistrements SPF créerait des conflits et rendrait la protection inefficace."
            },
            {
                question: "Quelle analogie décrit le mieux le rôle de SPF ?",
                answers: [
                    { text: "Une liste d'invités VIP à l'entrée d'un événement", correct: true },
                    { text: "Un système de caméras de surveillance avec reconnaissance faciale automatique et analyse comportementale", correct: false },
                    { text: "Un coffre-fort", correct: false },
                    { text: "Un détecteur de métaux avec alarme sonore et visuelle", correct: false }
                ],
                explanation: "SPF est comme une liste d'invités : seuls les serveurs 'sur la liste' peuvent envoyer des emails au nom du domaine. Simple et efficace pour contrôler les accès."
            }
        ]
    },
    3: {
        title: "Les 3 protections ensemble",
        questions: [
            {
                question: "À quoi sert DKIM en termes simples ?",
                answers: [
                    { text: "À signer chaque email avec une signature électronique", correct: true },
                    { text: "À chiffrer automatiquement le contenu des emails avec des clés de 256 bits et algorithmes avancés", correct: false },
                    { text: "À scanner les attachments", correct: false },
                    { text: "À router intelligemment les emails vers les serveurs", correct: false }
                ],
                explanation: "DKIM signe chaque email envoyé, comme signer un chèque ou un contrat. Cette signature permet au destinataire de vérifier que l'email n'a pas été modifié et vient bien de l'expéditeur légitime."
            },
            {
                question: "Que fait DMARC quand SPF et DKIM échouent ?",
                answers: [
                    { text: "Il applique la politique définie : ne rien faire, quarantaine ou rejet", correct: true },
                    { text: "Il transfère l'email vers un serveur de sauvegarde sécurisé avec notification automatique des administrateurs", correct: false },
                    { text: "Il envoie une alerte", correct: false },
                    { text: "Il lance une procédure d'audit", correct: false }
                ],
                explanation: "DMARC définit la politique à appliquer quand SPF ou DKIM échouent : 'none' (surveiller), 'quarantine' (spam) ou 'reject' (bloquer). C'est le chef de sécurité qui prend les décisions."
            },
            {
                question: "Peut-on se contenter de SPF seul pour protéger un domaine ?",
                answers: [
                    { text: "Non, il faut les 3 protections ensemble pour une sécurité optimale", correct: true },
                    { text: "Oui, SPF suffit largement pour tous les cas d'usage professionnels modernes et les PME", correct: false },
                    { text: "Oui, pour les petites entreprises", correct: false },
                    { text: "Non, mais SPF plus un antivirus performant suffisent", correct: false }
                ],
                explanation: "SPF seul peut être contourné par les attaquants. DKIM ajoute la signature, DMARC coordonne le tout. C'est comme la sécurité d'une banque : une seule protection ne suffit jamais."
            },
            {
                question: "Quelle analogie décrit le mieux SPF + DKIM + DMARC ?",
                answers: [
                    { text: "Badge d'accès + Code secret + Caméras de surveillance", correct: true },
                    { text: "Mot de passe unique avec double authentification par SMS et email avec confirmation biométrique", correct: false },
                    { text: "Antivirus premium", correct: false },
                    { text: "Sauvegarde automatique avec synchronisation cloud", correct: false }
                ],
                explanation: "Comme la sécurité d'une banque : SPF = badge d'accès (qui peut entrer), DKIM = code secret (authentification), DMARC = caméras (surveillance et décisions). Sécurité multicouche indispensable !"
            },
            {
                question: "Pourquoi faut-il ces 3 protections ensemble ?",
                answers: [
                    { text: "Parce que les attaquants peuvent contourner une protection unique", correct: true },
                    { text: "Parce que la loi européenne RGPD impose l'utilisation simultanée de ces trois protocoles de sécurité email", correct: false },
                    { text: "Pour réduire les coûts", correct: false },
                    { text: "Parce que Google et Microsoft refusent les emails", correct: false }
                ],
                explanation: "Chaque protection a ses failles. SPF peut être contourné, DKIM peut être compromis. Ensemble, elles se complètent et offrent une protection solide contre les attaques sophistiquées."
            }
        ]
    },
    4: {
        title: "Vérification pratique",
        questions: [
            {
                question: "Quel site permet de vérifier SPF/DKIM/DMARC facilement ?",
                answers: [
                    { text: "MXToolbox.com", correct: true },
                    { text: "Google Analytics avec module de sécurité email avancé activé et tableaux de bord personnalisés", correct: false },
                    { text: "Microsoft Office 365", correct: false },
                    { text: "Norton Antivirus Online Scanner", correct: false }
                ],
                explanation: "MXToolbox.com est l'outil gratuit le plus populaire pour vérifier les protections email d'un domaine. Interface simple, résultats clairs, parfait pour débuter !"
            },
            {
                question: "Qui configure ces protections dans une entreprise ?",
                answers: [
                    { text: "L'administrateur système ou réseau", correct: true },
                    { text: "Exclusivement le directeur informatique avec validation du conseil d'administration et des actionnaires", correct: false },
                    { text: "Un prestataire externe certifié", correct: false },
                    { text: "Le développeur web senior", correct: false }
                ],
                explanation: "C'est typiquement le travail de l'administrateur système/réseau. Le développeur doit comprendre l'impact, mais n'a généralement pas les droits pour configurer le DNS et les serveurs email."
            },
            {
                question: "Solution recommandée pour un développeur fullstack débutant seul sur son projet ?",
                answers: [
                    { text: "Utiliser un service d'envoi d'emails comme Brevo ou SendGrid", correct: true },
                    { text: "Configurer manuellement SPF/DKIM/DMARC sur son propre serveur email dédié avec certificats SSL", correct: false },
                    { text: "Installer un serveur mail", correct: false },
                    { text: "Ignorer ces protections", correct: false }
                ],
                explanation: "Pour un développeur débutant seul, utiliser un service d'envoi d'emails (Brevo, Mailgun, SendGrid) est LA solution. SPF/DKIM/DMARC sont déjà configurés et la délivrabilité est garantie !"
            },
            {
                question: "Google.com a-t-il ces protections ?",
                answers: [
                    { text: "Oui, protection complète SPF + DKIM + DMARC", correct: true },
                    { text: "Non, Google utilise un système propriétaire plus avancé que ces protocoles standards de l'industrie", correct: false },
                    { text: "Partiellement protégé", correct: false },
                    { text: "Non vérifié publiquement", correct: false }
                ],
                explanation: "Bien sûr ! Google a une protection email exemplaire avec SPF, DKIM et DMARC configurés. Vous pouvez le vérifier sur MXToolbox.com en tapant 'google.com'."
            },
            {
                question: "Quel est l'avantage principal des services comme Brevo ou Mailgun ?",
                answers: [
                    { text: "SPF/DKIM/DMARC déjà configurés, pas de serveur email à maintenir", correct: true },
                    { text: "Ils sont toujours gratuits sans limite d'envoi et sans aucune restriction de volume", correct: false },
                    { text: "Ils coûtent moins cher", correct: false },
                    { text: "Ils sont plus rapides", correct: false }
                ],
                explanation: "L'énorme avantage : toute la complexité de SPF/DKIM/DMARC est gérée pour vous. Haute délivrabilité garantie, documentation claire, et offres gratuites pour débuter !"
            },
            {
                question: "Impact pour un développeur si l'email de confirmation ne passe pas ?",
                answers: [
                    { text: "Les utilisateurs ne peuvent pas finaliser leur inscription", correct: true },
                    { text: "Le serveur web tombe automatiquement en panne après 10 tentatives d'envoi et nécessite un redémarrage", correct: false },
                    { text: "La base de données se corrompt", correct: false },
                    { text: "L'application devient inaccessible", correct: false }
                ],
                explanation: "Si l'email de confirmation finit en spam (ou n'arrive pas), l'utilisateur ne peut pas confirmer son inscription. La fonctionnalité est cassée, mauvaise expérience utilisateur garantie !"
            },
            {
                question: "Première chose à faire si les emails de son app finissent en spam ?",
                answers: [
                    { text: "Vérifier les protections SPF/DKIM/DMARC du domaine", correct: true },
                    { text: "Changer immédiatement de fournisseur d'hébergement web et de nom de domaine avec migration complète", correct: false },
                    { text: "Réécrire le code d'envoi", correct: false },
                    { text: "Contacter Gmail et Outlook", correct: false }
                ],
                explanation: "La première vérification : est-ce que le domaine a les bonnes protections email ? C'est souvent la cause principale des problèmes de délivrabilité pour les développeurs débutants."
            }
        ]
    },
    5: {
        title: "Récapitulatif général",
        questions: [
            {
                question: "Quelles sont les 3 protections email essentielles ?",
                answers: [
                    { text: "SPF, DKIM et DMARC", correct: true },
                    { text: "Antivirus, Firewall et Chiffrement avec certificats SSL/TLS et validation par autorité de certification", correct: false },
                    { text: "Authentification double facteur et VPN", correct: false },
                    { text: "HTTPS, Captcha et Limitation du taux", correct: false }
                ],
                explanation: "SPF (qui peut envoyer), DKIM (signature authentique) et DMARC (politique de sécurité) forment le trio de base pour protéger l'identité email d'une organisation."
            },
            {
                question: "Pourquoi c'est important pour un développeur web ?",
                answers: [
                    { text: "Pour que les emails de ses applications arrivent à destination", correct: true },
                    { text: "Pour obtenir automatiquement une certification en cybersécurité reconnue internationalement", correct: false },
                    { text: "Pour respecter les normes européennes", correct: false },
                    { text: "Pour augmenter les performances", correct: false }
                ],
                explanation: "Un développeur crée des apps qui envoient des emails. Sans les bonnes protections, ces emails finissent en spam = fonctionnalités cassées = utilisateurs mécontents !"
            },
            {
                question: "Comment vérifier si un domaine est bien protégé ?",
                answers: [
                    { text: "Avec des outils gratuits comme MXToolbox.com", correct: true },
                    { text: "En installant des logiciels spécialisés payants sur son ordinateur avec licence professionnelle", correct: false },
                    { text: "En demandant un audit professionnel", correct: false },
                    { text: "En analysant le code source", correct: false }
                ],
                explanation: "Pas besoin d'être expert ! Des sites gratuits comme MXToolbox.com permettent de vérifier en quelques secondes si un domaine a ses protections email en place."
            },
            {
                question: "Que se passe-t-il sans ces protections ?",
                answers: [
                    { text: "Risque élevé d'emails en spam et d'usurpation d'identité", correct: true },
                    { text: "Fermeture automatique du site web par les autorités de régulation et sanction administrative", correct: false },
                    { text: "Interdiction d'envoyer des emails commerciaux", correct: false },
                    { text: "Suppression des moteurs de recherche", correct: false }
                ],
                explanation: "Sans protection, n'importe qui peut envoyer des faux emails au nom du domaine, et les vrais emails risquent de finir en spam. Double problème pour l'organisation !"
            },
            {
                question: "Qui s'occupe de configurer ces protections ?",
                answers: [
                    { text: "L'administrateur système, mais le développeur doit comprendre l'impact", correct: true },
                    { text: "Exclusivement le développeur web qui doit tout maîtriser de A à Z avec formation cybersécurité", correct: false },
                    { text: "Un prestataire externe spécialisé", correct: false },
                    { text: "Le service marketing", correct: false }
                ],
                explanation: "Travail d'équipe ! L'admin configure, le développeur comprend l'impact sur ses apps. Une bonne collaboration évite les problèmes de délivrabilité email."
            }
        ]
    }
};

// État global des quiz
const quizState = {
    1: { currentQuestion: 0, score: 0, answers: [], completed: false },
    2: { currentQuestion: 0, score: 0, answers: [], completed: false },
    3: { currentQuestion: 0, score: 0, answers: [], completed: false },
    4: { currentQuestion: 0, score: 0, answers: [], completed: false },
    5: { currentQuestion: 0, score: 0, answers: [], completed: false }
};

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Fonction pour afficher une question du quiz
function displayQuestion(quizId) {
    const quiz = quizData[quizId];
    const state = quizState[quizId];
    const question = quiz.questions[state.currentQuestion];
    
    // Mélanger les réponses pour la randomisation
    const shuffledAnswers = shuffleArray(question.answers);
    
    // Mettre à jour l'affichage
    document.getElementById(`quiz${quizId}-current`).textContent = state.currentQuestion + 1;
    document.getElementById(`quiz${quizId}-question-text`).innerHTML = question.question;
    
    // Créer les boutons de réponse
    const answersContainer = document.getElementById(`quiz${quizId}-answers`);
    answersContainer.innerHTML = '';
    
    shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-answer';
        button.innerHTML = answer.text;
        button.onclick = () => selectAnswer(quizId, answer.correct, answer.text, question.explanation);
        answersContainer.appendChild(button);
    });
    
    // Réinitialiser le bouton et cacher le résultat
    const btn = document.getElementById(`quiz${quizId}-btn`);
    btn.textContent = 'Valider';
    btn.disabled = true;
    btn.onclick = () => handleQuizAction(quizId);
    
    document.getElementById(`quiz${quizId}-result`).style.display = 'none';
    
    // Mettre à jour la barre de progression
    const progress = ((state.currentQuestion + 1) / quiz.questions.length) * 100;
    document.getElementById(`quiz${quizId}-progress`).style.width = `${progress}%`;
}

// Fonction pour sélectionner une réponse
function selectAnswer(quizId, isCorrect, answerText, explanation) {
    const state = quizState[quizId];
    
    // Enlever la sélection précédente
    document.querySelectorAll(`#quiz${quizId} .quiz-answer`).forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Marquer la nouvelle sélection
    event.target.classList.add('selected');
    
    // Stocker la réponse
    state.answers[state.currentQuestion] = { isCorrect, answerText, explanation };
    
    // Activer le bouton valider
    document.getElementById(`quiz${quizId}-btn`).disabled = false;
}

// Fonction pour gérer les actions du quiz (valider/suivant/recommencer)
function handleQuizAction(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];
    const btn = document.getElementById(`quiz${quizId}-btn`);
    
    if (btn.textContent === 'Valider') {
        // Afficher le résultat de la question
        showQuestionResult(quizId);
        
        // Mettre à jour le score
        if (state.answers[state.currentQuestion].isCorrect) {
            state.score++;
        }
        
        // Préparer pour la suite
        if (state.currentQuestion < quiz.questions.length - 1) {
            btn.textContent = 'Question suivante';
        } else {
            btn.textContent = 'Voir le score final';
        }
        
    } else if (btn.textContent === 'Question suivante') {
        // Passer à la question suivante
        state.currentQuestion++;
        displayQuestion(quizId);
        
    } else if (btn.textContent === 'Voir le score final') {
        // Afficher le score final
        showFinalScore(quizId);
        btn.textContent = 'Recommencer le quiz';
        state.completed = true;
        
    } else if (btn.textContent === 'Recommencer le quiz') {
        // Recommencer le quiz
        resetQuiz(quizId);
    }
}

// Fonction pour afficher le résultat d'une question
function showQuestionResult(quizId) {
    const state = quizState[quizId];
    const answer = state.answers[state.currentQuestion];
    const resultDiv = document.getElementById(`quiz${quizId}-result`);
    
    // Colorer les réponses
    document.querySelectorAll(`#quiz${quizId} .quiz-answer`).forEach(btn => {
        btn.disabled = true;
        if (btn.classList.contains('selected')) {
            btn.classList.add(answer.isCorrect ? 'correct' : 'incorrect');
        }
    });
    
    // Afficher l'explication
    const resultClass = answer.isCorrect ? 'correct' : 'incorrect';
    const resultIcon = answer.isCorrect ? '✅' : '❌';
    const resultText = answer.isCorrect ? 'Correct !' : 'Incorrect';
    
    resultDiv.innerHTML = `
        <div style="color: ${answer.isCorrect ? 'var(--secondary-color)' : 'var(--danger-color)'}; font-weight: 600; margin-bottom: 1rem;">
            ${resultIcon} ${resultText}
        </div>
        <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 8px;">
            <strong>💡 Explication :</strong><br>
            ${answer.explanation}
        </div>
    `;
    resultDiv.style.display = 'block';
}

// Fonction pour afficher le score final
function showFinalScore(quizId) {
    const state = quizState[quizId];
    const quiz = quizData[quizId];
    const percentage = Math.round((state.score / quiz.questions.length) * 100);
    const resultDiv = document.getElementById(`quiz${quizId}-result`);
    
    // Déterminer le message selon le score
    let message, color, icon;
    if (percentage >= 80) {
        message = "Excellent travail ! Vous maîtrisez bien le sujet.";
        color = "var(--secondary-color)";
        icon = "🏆";
    } else if (percentage >= 60) {
        message = "Bon travail ! Quelques points à revoir.";
        color = "var(--accent-color)";
        icon = "👍";
    } else {
        message = "Il serait bon de revoir le chapitre.";
        color = "var(--danger-color)";
        icon = "📚";
    }
    
    resultDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: ${color}; margin-bottom: 1rem;">
                Score : ${state.score}/${quiz.questions.length} (${percentage}%)
            </div>
            <div style="color: var(--text-dark); margin-bottom: 1.5rem;">
                ${message}
            </div>
            <div style="background: var(--bg-light); padding: 1rem; border-radius: 8px; border-left: 4px solid ${color};">
                <strong>Quiz "${quiz.title}" terminé !</strong><br>
                Vous pouvez recommencer pour améliorer votre score ou passer au chapitre suivant.
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';
}

// Fonction pour réinitialiser un quiz
function resetQuiz(quizId) {
    quizState[quizId] = { currentQuestion: 0, score: 0, answers: [], completed: false };
    displayQuestion(quizId);
}

// Fonction pour gérer les dropdowns
function toggleDropdown(element) {
    element.classList.toggle('active');
}

// Fonction pour la navigation smooth scroll
function smoothScrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Fonction pour mettre à jour la navigation active
function updateActiveNavigation() {
    const sections = ['objectifs', 'probleme', 'spf', 'protections', 'verification', 'synthese'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les quiz
    for (let i = 1; i <= 5; i++) {
        displayQuestion(i);
    }
    
    // Ajouter les event listeners pour les dropdowns
    document.querySelectorAll('.dropdown-title').forEach(title => {
        title.addEventListener('click', () => toggleDropdown(title.parentElement));
    });
    
    // Ajouter les event listeners pour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            smoothScrollToSection(sectionId);
        });
    });
    
    // Mettre à jour la navigation active au scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Première mise à jour de la navigation
    updateActiveNavigation();

    // Initialiser la checklist avec sauvegarde dans localStorage
    initChecklist();

    console.log('🎓 Cours SPF/DKIM/DMARC initialisé avec succès !');
    console.log('📊 5 quiz interactifs avec questions randomisées prêts');
    console.log('🎯 Niveau : BTS SIO SLAM - Débutants');
    console.log('✅ Checklist interactive avec sauvegarde locale activée');
});

// Fonction utilitaire pour déboguer les quiz (dev only)
function debugQuiz(quizId) {
    console.log(`Quiz ${quizId} state:`, quizState[quizId]);
    console.log(`Quiz ${quizId} data:`, quizData[quizId]);
}

// ======= GESTION DE LA CHECKLIST =======

/**
 * Initialise la checklist avec sauvegarde dans le localStorage
 * Permet de conserver l'état des checkboxes entre les sessions
 */
function initChecklist() {
    const STORAGE_KEY = 'spf_dkim_dmarc_checklist_state';

    // Récupérer tous les checkboxes de la checklist
    const checkboxes = document.querySelectorAll('.checklist-checkbox');

    if (checkboxes.length === 0) {
        console.log('ℹ️ Aucune checklist trouvée sur cette page');
        return;
    }

    // Charger l'état sauvegardé depuis localStorage
    function loadChecklistState() {
        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                const state = JSON.parse(savedState);
                Object.keys(state).forEach(id => {
                    const checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = state[id];
                    }
                });
                console.log(`✅ État de la checklist restauré (${Object.keys(state).length} items)`);
            }
        } catch (error) {
            console.warn('⚠️ Erreur lors du chargement de la checklist:', error);
        }
    }

    // Sauvegarder l'état actuel dans localStorage
    function saveChecklistState() {
        try {
            const state = {};
            checkboxes.forEach(checkbox => {
                if (checkbox.id) {
                    state[checkbox.id] = checkbox.checked;
                }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

            // Calculer et afficher les statistiques
            const checkedCount = Object.values(state).filter(v => v).length;
            const totalCount = Object.keys(state).length;
            const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

            console.log(`💾 Checklist sauvegardée: ${checkedCount}/${totalCount} (${percentage}%)`);
        } catch (error) {
            console.warn('⚠️ Erreur lors de la sauvegarde de la checklist:', error);
        }
    }

    // Ajouter les event listeners sur chaque checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            saveChecklistState();

            // Animation visuelle lors du check
            if (this.checked) {
                const item = this.closest('.checklist-item');
                if (item) {
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = 'checkPop 0.3s ease';
                    }, 10);
                }
            }
        });
    });

    // Charger l'état initial
    loadChecklistState();

    // Ajouter des fonctions utilitaires globales
    window.resetChecklist = function() {
        if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toute la checklist ?')) {
            localStorage.removeItem(STORAGE_KEY);
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            console.log('🔄 Checklist réinitialisée');
        }
    };

    window.getChecklistProgress = function() {
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;
        const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

        console.log(`📊 Progression de la checklist:`);
        console.log(`   ✅ Complétés: ${checkedCount}/${totalCount}`);
        console.log(`   📈 Pourcentage: ${percentage}%`);

        return {
            checked: checkedCount,
            total: totalCount,
            percentage: percentage
        };
    };

    window.exportChecklistProgress = function() {
        const state = {};
        checkboxes.forEach(checkbox => {
            if (checkbox.id) {
                const label = checkbox.nextElementSibling;
                const title = label ? label.querySelector('strong')?.textContent : checkbox.id;
                state[title || checkbox.id] = checkbox.checked;
            }
        });

        console.log('📤 Export de la progression:');
        console.table(state);

        return state;
    };

    console.log(`✅ Checklist initialisée (${checkboxes.length} items)`);
    console.log('💡 Commandes disponibles:');
    console.log('   - resetChecklist() : Réinitialiser la checklist');
    console.log('   - getChecklistProgress() : Voir la progression');
    console.log('   - exportChecklistProgress() : Exporter les résultats');
}