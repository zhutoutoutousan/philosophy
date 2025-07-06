"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import MermaidDiagram from "@/components/mermaid"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Lightbulb,
  Award,
  Crown,
  Languages,
  Brain,
  Star,
  Sparkles,
  BookOpen,
  ScrollText,
  BookMarked
} from "lucide-react"
import { Metadata } from 'next'
import Head from 'next/head'

interface ReadingInterfaceProps {
  bookId?: string
}

type LanguageCode = "en" | "de" | "zh"

interface Translations {
  en: string;
  de: string;
  zh: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  translations: Translations;
  insight?: string;
  vocabulary?: Array<{
    term: string;
    definition: string;
    usage: string;
  }>;
  diagram?: {
    title: string;
    description: string;
    mermaidDefinition: string;
  };
  quiz?: QuizQuestion[];
}

interface MermaidProps {
  chart: string;
  className?: string;
}

const seoMetadata = {
  title: 'Kant\'s Critique of Pure Reason - Interactive Study Guide',
  description: 'An interactive trilingual study guide for Kant\'s Critique of Pure Reason with translations, commentary, diagrams, and quizzes.',
  keywords: 'Kant, Critique of Pure Reason, philosophy, metaphysics, transcendental idealism, German philosophy, interactive learning',
  openGraph: {
    title: 'Kant\'s Critique of Pure Reason - Interactive Study Guide',
    description: 'Study Kant\'s masterwork with parallel translations, expert commentary, and interactive features',
    type: 'website',
    locale: 'en_US',
  }
} as const

export default function ReadingInterface({ bookId = "kant" }: ReadingInterfaceProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState<LanguageCode>("en")
  const [currentSectionIndex, setCurrentSectionIndex] = React.useState(0)
  const [showVocabulary, setShowVocabulary] = React.useState(false)
  const [showQuiz, setShowQuiz] = React.useState(false)
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)
  const [xp, setXp] = React.useState(0)

  const sections: Section[] = [
    {
      id: "dedication",
      title: "Dedication",
      translations: {
        de: `Freiherr von Zedlitz,
Staatsminister

Gnädiger Herr!

Den Wachstum der Wissenschaften an seinem Teile befördern, heißt an Ew. Exzellenz eigenem Interesse arbeiten; denn dieses ist mit jenen, nicht bloß durch den erhabenen Posten eines Beschützers, sondern durch das viel vertrautere eines Liebhabers und erleuchteten Kenners, innigst verbunden. Deswegen bediene ich mich auch des einigen Mittels, das gewissermaßen in meinem Vermögen ist, meine Dankbarkeit für das gnädige Zutrauen zu bezeigen, womit Ew. Exzellenz mich beehren, als könne ich zu dieser Absicht etwas beitragen.`,
        en: `Baron von Zedlitz,
Minister of State

Gracious Lord!

To promote the growth of the sciences in one's own way is to work in Your Excellency's own interest; for this is intimately connected with them, not merely through the exalted position of a protector, but through the much more intimate relationship of a lover and enlightened connoisseur. For this reason I also make use of the only means that is to some extent within my power to show my gratitude for the gracious confidence with which Your Excellency honors me, as if I could contribute something to this purpose.`,
        zh: `策德利茨男爵阁下：
国务大臣

尊敬的阁下！

以自己的方式促进科学的发展，就是为了阁下的利益而工作；因为这与科学的关系不仅仅在于阁下作为保护者的崇高地位，更在于作为一位热爱者和睿智鉴赏家的更为亲密的关系。因此，我也运用我力所能及的唯一方式，以表达我对阁下赐予我的信任的感激之情，仿佛我也能为此目的做出一些贡献。`
      },
      content: `## Dedication to Baron von Zedlitz

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "Kant dedicates his work to Baron von Zedlitz, who was Prussia's Minister of State and responsible for educational and religious affairs. The dedication emphasizes the Baron's role not just as an official patron of sciences but as someone who genuinely appreciates and understands intellectual pursuits.",
      vocabulary: [
        {
          term: "Freiherr",
          definition: "Baron (literally 'Free Lord')",
          usage: "A title of nobility"
        },
        {
          term: "Staatsminister",
          definition: "Minister of State",
          usage: "A high-ranking government official"
        },
        {
          term: "Gnädiger Herr",
          definition: "Gracious Lord",
          usage: "A formal address to nobility"
        },
        {
          term: "Ew. Exzellenz",
          definition: "Your Excellency",
          usage: "Formal address for high-ranking officials (abbreviated from 'Eure Exzellenz')"
        }
      ],
      quiz: [
        {
          id: "dedication-1",
          question: "What dual role does Baron von Zedlitz play in relation to the sciences according to Kant?",
          options: [
            "Teacher and student",
            "Protector and critic",
            "Protector and enlightened connoisseur",
            "Patron and researcher"
          ],
          correctAnswer: 2,
          explanation: "Kant emphasizes that Baron von Zedlitz is not only a protector of sciences through his official position but also an enlightened connoisseur who truly understands and appreciates them."
        },
        {
          id: "dedication-2",
          question: "Why does Kant say he's writing this dedication?",
          options: [
            "To gain political favor",
            "To show gratitude for the Baron's confidence in him",
            "To request funding for research",
            "To fulfill a formal requirement"
          ],
          correctAnswer: 1,
          explanation: "Kant explicitly states that he's using this means to show his gratitude for the gracious confidence that Baron von Zedlitz has shown in him."
        }
      ],
      diagram: {
        title: "Relationship Between Baron von Zedlitz and the Sciences",
        description: "Diagram showing the dual role of Baron von Zedlitz in relation to the sciences as described in Kant's dedication",
        mermaidDefinition: `graph TB
    A[Baron von Zedlitz] -->|Official Role| B[Protector of Sciences]
    A -->|Personal Role| C[Lover of Knowledge]
    C -->|Characterized by| D[Enlightened Understanding]
    B -->|Promotes| E[Growth of Sciences]
    C -->|Promotes| E
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#e6e6fa`
      }
    },
    {
      id: "preface-2nd-edition",
      title: "Vorrede zur zweiten Auflage",
      translations: {
        de: `Ob die Bearbeitung der Erkenntnisse, die zum Vernunftgeschäfte gehören, den sicheren Gang einer Wissenschaft gehe oder nicht, das läßt sich bald aus dem Erfolg beurteilen. Wenn sie nach viel gemachten Anstalten und Zurüstungen, so bald es zum Zweck kommt, in Stecken gerät, oder, um diesen zu erreichen, öfters wieder zurückgehen und einen andern Weg einschlagen muß; imgleichen wenn es nicht möglich ist, die verschiedenen Mitarbeiter in der Art, wie die gemeinschaftliche Absicht erfolgt werden soll, einhellig zu machen: so kann man immer überzeugt sein, daß ein solches Studium bei weitem noch nicht den sicheren Gang einer Wissenschaft eingeschlagen, sondern ein bloßes Herumtappen sei, und es ist schon ein Verdienst um die Vernunft, diesen Weg wo möglich ausfindig zu machen, sollte auch manches als vergeblich aufgegeben werden müssen, was in dem ohne Überlegung vorher genommenen Zwecke enthalten war.

Daß die Logik diesen sicheren Gang schon von den ältesten Zeiten her gegangen sei, läßt sich daraus ersehen, daß sie seit dem Aristoteles keinen Schritt rückwärts hat tun dürfen, wenn man ihr nicht etwa die Wegschaffung einiger entbehrlichen Subtilitäten, oder deutlichere Bestimmung des Vorgetragenen, als Verbesserungen anrechnen will, welches aber mehr zur Eleganz, als zur Sicherheit der Wissenschaft gehört.`,
        en: `Whether the treatment of the knowledge that belongs to reason's business follows the secure path of a science or not can quickly be judged by its outcome. If after many preparations and preliminaries it gets stuck as soon as it approaches its goal, or if to reach this goal it must often turn back and take a different path; likewise if it is not possible to make the different collaborators agree on the manner in which their common aim should be pursued: then one can be convinced that such a study has by no means entered upon the secure path of a science, but is merely groping about, and it is already a service to reason to find this path if possible, even if much must be abandoned as futile that was previously included in the goal that had been chosen without reflection.

That logic has already followed this secure path since the earliest times can be seen from the fact that since Aristotle it has not had to take a single step backward, unless we count as improvements the removal of a few dispensable subtleties or the clearer determination of its presentation, which belongs more to the elegance than to the security of the science.`,
        zh: `理性事业所涉及的知识的处理方式是否走上了科学的确定道路，这很快就能从其结果中判断出来。如果在做了许多准备和安排之后，一旦接近目标就陷入困境，或者为了达到这个目标，必须经常回头走另一条路；同样，如果不可能让不同的合作者在如何实现共同目标的方式上达成一致：那么我们就可以确信，这样的研究远未走上科学的确定道路，而只是在摸索，如果能找到这条道路，即使必须放弃一些在未经深思熟虑的目标中包含的东西，这也是对理性的一种贡献。

逻辑自古以来就走上了这条确定的道路，这可以从以下事实看出：自亚里士多德以来，它就不必走回头路，除非我们把一些不必要的细节的删除，或者对所讲内容更清晰的规定，算作改进，但这更多地属于优雅性，而不是科学的确定性。`
      },
      content: `## Vorrede zur zweiten Auflage (Preface to the Second Edition)

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this preface, Kant introduces his revolutionary approach to metaphysics by comparing it to the established sciences, particularly logic. He emphasizes how logic has maintained a secure path since Aristotle, while other fields of reason have struggled to find their scientific footing.",
      vocabulary: [
        {
          term: "Vernunftgeschäfte",
          definition: "Business of reason",
          usage: "Refers to the systematic activities and operations of human reason"
        },
        {
          term: "sicheren Gang",
          definition: "Secure path/course",
          usage: "Used to describe the methodical and reliable progress of a science"
        },
        {
          term: "Herumtappen",
          definition: "Groping about",
          usage: "Describes unsystematic, trial-and-error attempts at understanding"
        }
      ],
      quiz: [
        {
          id: "preface-1",
          question: "According to Kant, how can we quickly judge if a field of knowledge is following the secure path of science?",
          options: [
            "By counting the number of scholars in the field",
            "By measuring its practical applications",
            "By examining its outcome and progress",
            "By comparing it with other sciences"
          ],
          correctAnswer: 2,
          explanation: "Kant states that we can quickly judge whether a field follows the secure path of science by its outcome (aus dem Erfolg), particularly whether it can progress without having to frequently backtrack or change direction."
        },
        {
          id: "preface-2",
          question: "What distinguishes logic from other fields according to the text?",
          options: [
            "It is more practical than other sciences",
            "It has never had to take a step backward since Aristotle",
            "It is more complex than other fields",
            "It changes constantly with new discoveries"
          ],
          correctAnswer: 1,
          explanation: "Kant points out that logic has followed a secure path since ancient times, evidenced by the fact that since Aristotle it has not had to take a single step backward, only improving in clarity and removing unnecessary subtleties."
        },
        {
          id: "preface-3",
          question: "What does Kant consider a sign that a field of study has NOT found the secure path of science?",
          options: [
            "When it requires extensive preparation",
            "When it has multiple researchers",
            "When collaborators cannot agree on how to pursue their common aim",
            "When it involves complex theories"
          ],
          correctAnswer: 2,
          explanation: "Kant indicates that when different collaborators cannot agree on how to pursue their common aim (die verschiedenen Mitarbeiter... einhellig zu machen), it's a sign that the field has not yet found the secure path of science."
        }
      ],
      diagram: {
        title: "The Path of Scientific Knowledge",
        description: "Visualization of Kant's contrast between secure scientific progress and unsystematic attempts",
        mermaidDefinition: `graph TB
    A[Knowledge Field] -->|Evaluation| B{Follows Scientific Path?}
    B -->|Yes| C[Secure Progress]
    B -->|No| D[Groping About]
    C -->|Characteristics| E["1. Steady Forward Progress<br/>2. No Need to Backtrack<br/>3. United Methodology"]
    D -->|Signs| F["1. Frequent Backtracking<br/>2. Changing Paths<br/>3. Disagreement on Methods"]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#e6e6fa
    style D fill:#f0f0f0
    style E fill:#e6e6fa
    style F fill:#f0f0f0`
      }
    },
    {
      id: "mathematics-and-reason",
      title: "Mathematik und reine Vernunft",
      translations: {
        de: `So fern in diesen nun Vernunft sein soll, so muß darin etwas a priori erkannt werden, und ihre Erkenntnis kann auf zweierlei Art auf ihren Gegenstand bezogen werden, entweder diesen und seinen Begriff (der anderweitig gegeben werden muß) bloß zu bestimmen, oder ihn auch wirklich zu machen. Die erste ist theoretische, die andere praktische Erkenntnis der Vernunft. Von beiden muß der reine Teil, so viel oder so wenig er auch enthalten mag, nämlich derjenige, darin Vernunft gänzlich a priori ihr Objekt bestimmt, vorher allein vorgetragen werden, und dasjenige, was aus anderen Quellen kommt, damit nicht vermengt werden; denn es gibt übele Wirtschaft, wenn man blindlings ausgibt, was einkommt, ohne nachher, wenn jene in Stecken gerät, unterscheiden zu können, welcher Teil der Einnahme den Aufwand tragen könne, und von welcher man denselben beschneiden muß.

Mathematik und Physik sind die beiden theoretischen Erkenntnisse der Vernunft, welche ihre Objekte a priori bestimmen sollen, die erstere ganz rein, die zweite wenigstens zum Teil rein, denn aber auch nach Maßgabe anderer Erkenntnisquellen als der der Vernunft.

Die Mathematik ist von den frühesten Zeiten her, wohin die Geschichte der menschlichen Vernunft reicht, in dem bewundernswürdigen Volke der Griechen den sichern Weg einer Wissenschaft gegangen. Allein man darf nicht denken, daß es ihr so leicht geworden, wie der Logik, wo die Vernunft es nur mit sich selbst zu tun hat, jenen königlichen Weg zu treffen, oder vielmehr sich selbst zu bahnen; vielmehr glaube ich, daß es lange mit ihr (vornehmlich noch unter den Ägyptern) beim Herumtappen geblieben ist, und diese Umänderung einer Revolution zuzuschreiben sei, die der glückliche Einfall eines einzigen Mannes in einem Versuche zu Stande brachte, von welchem an die Bahn, die man nehmen mußte, nicht mehr zu verfehlen war, und der sichere Gang einer Wissenschaft für alle Zeiten und in unendliche Weiten eingeschlagen und vorgezeichnet war.

Dem ersten, der den gleichseitigen Triangel demonstrierte (er mag nun Thales oder wie man will geheißen haben), dem ging ein Licht auf; denn er fand, daß er nicht dem, was er in der Figur sahe, oder auch dem bloßen Begriffe derselben nachspüren und gleichsam davon ihre Eigenschaften ablernen, sondern durch das, was er nach Begriffen selbst a priori hineindachte und darstellete (durch Konstruktion), hervorbringen müsse, und daß er, um sicher etwas a priori zu wissen, er der Sache nichts beilegen müsse, als was aus dem notwendig folgte, was er seinem Begriffe gemäß selbst in sie gelegt hat.`,
        en: `Insofar as reason is to be found in these sciences, something must be known in them a priori, and their cognition can be related to its object in two ways: either merely determining the object and its concept (which must be given elsewhere), or making it actual. The first is theoretical, the other practical cognition of reason. Of both the pure part, however much or little it may contain, namely that in which reason determines its object entirely a priori, must be expounded first, and that which comes from other sources must not be mixed with it; for it makes for poor economics to spend blindly whatever comes in without being able to determine, when the shortage comes, which part of the income can bear the expenditure and which part must be cut.

Mathematics and physics are the two theoretical cognitions of reason which are supposed to determine their objects a priori, the former entirely purely, the latter at least partly purely but also following the standards of sources of cognition other than reason.

Mathematics has, from the earliest times to which the history of human reason reaches, in that admirable people the Greeks, traveled the secure path of a science. Yet it must not be thought that it was as easy for it as for logic, where reason has to do only with itself, to find that royal path, or rather to forge it for itself; rather, I believe that it long remained (especially among the Egyptians) at the stage of mere groping about, and that this transformation was to be ascribed to a revolution, brought about by the happy inspiration of a single man in an attempt from which the road to be taken onward could no longer be missed, and the secure course of a science was entered on and prescribed for all time and to an infinite extent.

For the first person who demonstrated the equilateral triangle (whether he was called Thales or had some other name), a light dawned; for he found that he had to produce what he saw according to concepts a priori and construct it, and that in order to know something securely a priori he had to ascribe to the thing nothing except what followed necessarily from what he himself had put into it in accordance with his concept.`,
        zh: `只要这些科学中存在理性，就必须在其中先天地认识某些东西，而它们的认识可以用两种方式与其对象相关联：要么仅仅确定对象及其概念（这必须从其他地方给出），要么使其成为现实。前者是理性的理论认识，后者是实践认识。对于这两者，无论其纯粹部分包含多少，即理性完全先天地确定其对象的那部分，都必须首先单独阐述，而不能与来自其他来源的内容混杂在一起；因为盲目地支出收入而不能在资金短缺时确定哪部分收入可以承担支出，哪部分必须削减，这是糟糕的经济管理。

数学和物理学是理性的两种理论认识，它们应当先天地确定其对象，前者完全纯粹，后者至少部分纯粹，但也要遵循理性之外的其他认识来源的标准。

数学从人类理性历史所能追溯的最早时期起，在令人惊叹的希腊人中就已经走上了科学的确定道路。但不要以为它像逻辑学那样容易找到这条皇家大道，在逻辑学中理性只需要与自身打交道；相反，我认为它（尤其是在埃及人那里）长期停留在摸索阶段，这种转变应归功于一场革命，这场革命是由一个人的幸运灵感在一次尝试中实现的，从那时起，要走的路就不会再迷失，科学的确定道路就为所有时代和无限的未来确立和规划好了。

对于第一个证明等边三角形的人（无论他叫泰勒斯还是其他名字），一道光明出现了；因为他发现，他必须根据先天概念产生和构造他所看到的东西，而且为了确切地先天地知道某事物，他必须仅仅把那些必然遵循于他根据自己的概念放入其中的东西归于这个事物。`,
      },
      content: `## Mathematics and Pure Reason

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this crucial passage, Kant distinguishes between theoretical and practical reason, and uses mathematics as a prime example of pure a priori knowledge. He describes how mathematics found its 'secure path' through a revolutionary insight: that mathematical knowledge comes not from observing figures, but from constructing them according to a priori concepts.",
      vocabulary: [
        {
          term: "a priori",
          definition: "Prior to experience; knowledge that is independent of empirical observation",
          usage: "Used to describe knowledge that can be obtained through pure reason alone"
        },
        {
          term: "theoretische Erkenntnis",
          definition: "Theoretical cognition/knowledge",
          usage: "Knowledge that determines objects conceptually without making them actual"
        },
        {
          term: "praktische Erkenntnis",
          definition: "Practical cognition/knowledge",
          usage: "Knowledge that involves making objects actual or bringing them into being"
        },
        {
          term: "gleichseitigen Triangel",
          definition: "Equilateral triangle",
          usage: "Used as an example of mathematical construction through pure reason"
        }
      ],
      quiz: [
        {
          id: "math-reason-1",
          question: "According to Kant, what are the two ways cognition can relate to its object?",
          options: [
            "Through experience and through reason",
            "Through determination and through actualization",
            "Through mathematics and through physics",
            "Through logic and through intuition"
          ],
          correctAnswer: 1,
          explanation: "Kant explicitly states that cognition can either merely determine its object and its concept (theoretical) or make it actual (practical)."
        },
        {
          id: "math-reason-2",
          question: "What distinguishes mathematics from physics in terms of a priori knowledge?",
          options: [
            "Mathematics is not a priori at all",
            "Mathematics is entirely pure a priori, while physics is partly pure",
            "Physics is entirely pure while mathematics is partly pure",
            "Both are equally pure a priori"
          ],
          correctAnswer: 1,
          explanation: "Kant states that mathematics determines its objects entirely purely a priori, while physics does so only partly purely and also follows other sources of cognition."
        },
        {
          id: "math-reason-3",
          question: "What was the revolutionary insight about the equilateral triangle that Kant describes?",
          options: [
            "That it could be measured precisely",
            "That it existed in nature",
            "That it had to be constructed according to a priori concepts",
            "That it was discovered by Thales"
          ],
          correctAnswer: 2,
          explanation: "Kant describes how the discoverer realized that mathematical knowledge comes not from observing figures, but from constructing them according to a priori concepts."
        }
      ],
      diagram: {
        title: "Kant's Theory of Mathematical Knowledge",
        description: "Visualization of how mathematical knowledge is constructed through pure reason",
        mermaidDefinition: `graph TB
    A[Mathematical Knowledge] -->|Two Key Aspects| B[Pure A Priori Construction]
    A -->|Two Key Aspects| C[Necessary Truth]
    B -->|Example| D[Equilateral Triangle]
    D -->|Not From| E["Observation<br/>(What we see)"]
    D -->|But From| F["Construction<br/>(A Priori Concepts)"]
    C -->|Results In| G["Universal & Necessary<br/>Properties"]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#f0f0f0`
      }
    },
    {
      id: "scientific-method",
      title: "Die wissenschaftliche Methode und die kopernikanische Wende",
      translations: {
        de: `Mit der Naturwissenschaft ging es weit langsamer zu, bis sie den Heeresweg der Wissenschaft traf; denn es sind nur etwa anderthalb Jahrhunderte, daß der Vorschlag des sinnreichen Baco von Verulam diese Entdeckung teils veranlaßte, teils, da man bereits auf der Spur derselben war, mehr belebte, welche eben sowohl nur durch eine schnell vorgegangene Revolution der Denkart erklärt werden kann.

Als Galilei seine Kugeln die schiefe Fläche mit einer von ihm selbst gewählten Schwere herabrollen, oder Torricelli die Luft ein Gewicht, was er sich zum voraus dem einer ihm bekannten Wassersäule gleich gedacht hatte, tragen ließ, oder in noch späterer Zeit Stahl Metalle in Kalk und diesen wiederum in Metall verwandelte, indem er ihnen etwas entzog und wiedergab: so ging allen Naturforschern ein Licht auf. Sie begriffen, daß die Vernunft nur das einsieht, was sie selbst nach ihrem Entwurfe hervorbringt, daß sie mit Prinzipien ihrer Urteile nach beständigen Gesetzen vorangehen und die Natur nötigen müsse, auf ihre Fragen zu antworten, nicht aber sich von ihr allein gleichsam am Leitbande gängeln lassen müsse.

Bisher nahm man an, alle unsere Erkenntnis müsse sich nach den Gegenständen richten; aber alle Versuche, über sie a priori etwas durch Begriffe auszumachen, wodurch unsere Erkenntnis erweitert würde, gingen unter dieser Voraussetzung zu nichte. Man versuche es daher einmal, ob wir nicht in den Aufgaben der Metaphysik damit besser fortkommen, daß wir annehmen, die Gegenstände müssen sich nach unserem Erkenntnis richten, welches so schon besser mit der verlangten Möglichkeit einer Erkenntnis derselben a priori zusammenstimmt, die über Gegenstände, ehe sie uns gegeben werden, etwas festsetzen soll.

Es ist hiemit eben so, als mit den ersten Gedanken des Kopernikus bewandt, der, nachdem es mit der Erklärung der Himmelsbewegungen nicht gut fort wollte, wenn er annahm, das ganze Sternheer drehe sich um den Zuschauer, versuchte, ob es nicht besser gelingen möchte, wenn er den Zuschauer sich drehen, und dagegen die Sterne in Ruhe ließ.`,
        en: `Natural science proceeded much more slowly until it found the highway of science; for it is scarcely more than one and a half centuries since Bacon's ingenious proposal partly occasioned this discovery and partly, since others were already on its trail, gave it fresh impetus, which can likewise be explained only through a rapidly occurring revolution in the way of thinking.

When Galileo rolled his balls down an inclined plane with a weight he himself had chosen, or when Torricelli made the air bear a weight that he had previously thought to be equal to that of a known column of water, or when in a later time Stahl changed metals into calx and then changed the latter back into metal by first removing something and then putting it back again, a light dawned on all students of nature. They comprehended that reason has insight only into what it itself produces according to its own design; that it must take the lead with principles of its judgments according to constant laws and compel nature to answer its questions, rather than letting nature guide its movements by keeping reason, as it were, in leading-strings.

It has hitherto been assumed that all our knowledge must conform to objects; but all attempts to establish something about them a priori through concepts that would extend our knowledge have, on this assumption, come to nothing. We must therefore make trial whether we may not have more success in the tasks of metaphysics, if we suppose that objects must conform to our knowledge. This would better agree with what is desired, namely, the possibility of an a priori knowledge of objects that would establish something about them before they are given to us.

This would be just like the first thoughts of Copernicus, who, when he did not make good progress in the explanation of the celestial motions if he assumed that the entire celestial host revolves around the observer, tried to see if he might not have greater success if he made the observer revolve and left the stars at rest.`,
        zh: `自然科学的进展要慢得多，直到它找到科学的大道；因为从培根的富有创见的建议部分促成这一发现，部分由于其他人已经在这条道路上，给予了新的推动力以来，才不过一个半世纪，这同样只能通过思维方式的迅速革命来解释。

当伽利略让他的球沿着倾斜面滚下，重量是他自己选择的，或者当托里拆利让空气承受一个重量，他事先认为这个重量等于已知水柱的重量，或者在后来，施塔尔将金属转化为石灰，然后通过先去除某物再放回去的方式将后者转回金属时，一道光明照亮了所有自然研究者。他们理解到，理性只能洞察它自己按照自己的设计所产生的东西；它必须带着其判断的原则，按照恒定的规律走在前面，强迫自然回答它的问题，而不是让自然牵着理性的鼻子走。

迄今为止，人们认为我们所有的知识都必须符合对象；但是在这种假设下，所有试图通过概念先天地确立某些能扩展我们知识的东西的尝试都归于无用。因此，我们必须尝试看看，如果我们假设对象必须符合我们的知识，在形而上学的任务中是否会取得更大的成功。这更符合我们所期望的，即关于对象的先天知识的可能性，这种知识能在对象被给予我们之前就确立关于它们的某些东西。

这就像哥白尼的首创思想，当他假设整个天体围绕观察者旋转而无法在解释天体运动方面取得良好进展时，他试图看看如果让观察者旋转而让星星保持静止，是否会取得更大的成功。`,
      },
      content: `## Scientific Method and the Copernican Revolution

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "This passage introduces Kant's famous 'Copernican Revolution' in philosophy. Just as Copernicus revolutionized astronomy by suggesting that observers revolve around the sun rather than vice versa, Kant proposes that objects must conform to our knowledge rather than our knowledge to objects. He draws inspiration from the scientific method of Galileo, Torricelli, and Stahl, who showed that reason must approach nature as an active judge rather than a passive student.",
      vocabulary: [
        {
          term: "Heeresweg der Wissenschaft",
          definition: "Highway of science",
          usage: "Metaphor for the secure path that science follows once it finds its proper method"
        },
        {
          term: "kopernikanische Wende",
          definition: "Copernican Revolution/Turn",
          usage: "Kant's radical proposal that objects conform to our knowledge rather than vice versa"
        },
        {
          term: "Naturwissenschaft",
          definition: "Natural science",
          usage: "The empirical study of nature through systematic observation and experimentation"
        },
        {
          term: "Vernunft",
          definition: "Reason",
          usage: "The faculty of understanding and knowledge that actively shapes our experience of reality"
        }
      ],
      quiz: [
        {
          id: "scientific-method-1",
          question: "What key insight did natural scientists gain according to Kant?",
          options: [
            "That nature should guide reason completely",
            "That experiments are unnecessary",
            "That reason must actively question nature according to its own principles",
            "That all knowledge comes from observation alone"
          ],
          correctAnswer: 2,
          explanation: "Kant emphasizes that scientists realized reason must take the lead with its principles and compel nature to answer its questions, rather than passively following nature's lead."
        },
        {
          id: "scientific-method-2",
          question: "What is Kant's 'Copernican Revolution' in philosophy?",
          options: [
            "A theory about planetary motion",
            "The proposal that objects must conform to our knowledge",
            "The idea that all knowledge comes from experience",
            "A rejection of scientific method"
          ],
          correctAnswer: 1,
          explanation: "Just as Copernicus proposed that observers revolve around the sun, Kant suggests that objects must conform to our knowledge rather than our knowledge to objects."
        },
        {
          id: "scientific-method-3",
          question: "Which scientists does Kant cite as examples of the proper scientific method?",
          options: [
            "Newton and Leibniz",
            "Galileo, Torricelli, and Stahl",
            "Plato and Aristotle",
            "Descartes and Spinoza"
          ],
          correctAnswer: 1,
          explanation: "Kant specifically mentions Galileo's experiments with inclined planes, Torricelli's work with air pressure, and Stahl's chemical experiments as examples of proper scientific method."
        }
      ],
      diagram: {
        title: "Kant's Revolution in Metaphysics",
        description: "Visualization of the parallel between Copernicus's astronomical revolution and Kant's epistemological revolution",
        mermaidDefinition: `graph TB
    A[Traditional View] -->|Assumes| B["Knowledge Conforms<br/>to Objects"]
    C[Kant's Revolution] -->|Proposes| D["Objects Conform<br/>to Knowledge"]
    
    E[Scientific Method] -->|Examples| F["Galileo<br/>Torricelli<br/>Stahl"]
    F -->|Shows| G["Reason Actively<br/>Questions Nature"]
    
    H[Copernican Parallel] -->|Old View| I["Stars Revolve<br/>Around Observer"]
    H -->|New View| J["Observer Revolves<br/>Stars at Rest"]
    
    style A fill:#e6e6fa
    style C fill:#e6e6fa
    style E fill:#e6e6fa
    style H fill:#e6e6fa
    style B fill:#f0f0f0
    style D fill:#f0f0f0
    style F fill:#f0f0f0
    style G fill:#e6e6fa
    style I fill:#f0f0f0
    style J fill:#f0f0f0`
      }
    },
    {
      id: "metaphysics-limits",
      title: "Die Grenzen der Metaphysik",
      translations: {
        de: `Dieser Versuch gelingt nach Wunsch, und verspricht der Metaphysik in ihrem ersten Teile, da sie sich nämlich mit Begriffen a priori beschäftigt, davon die korrespondierenden Gegenstände in der Erfahrung jenen angemessen gegeben werden können, den sicheren Gang einer Wissenschaft.

Aber es ergibt sich aus dieser Deduktion unseres Vermögens a priori zu erkennen im ersten Teile der Metaphysik ein befremdliches und dem ganzen Zwecke derselben, der den zweiten Teil beschäftigt, dem Anscheine nach sehr nachteiliges Resultat, nämlich daß wir mit ihm nie über die Grenze möglicher Erfahrung hinauskommen können, welches doch gerade die wesentlichste Angelegenheit dieser Wissenschaft ist.

Nun bleibt uns immer noch übrig, nachdem der spekulativen Vernunft alles Fortkommen in diesem Felde des Übersinnlichen abgesprochen worden, zu versuchen, ob sich nicht in ihrer praktischen Erkenntnis Data finden, jenen transzendenten Vernunftbegriff des Unbedingten zu bestimmen, und auf solche Weise, dem Wunsche der Metaphysik gemäß, über die Grenze aller möglichen Erfahrung hinaus mit unserem, aber nur in praktischer Absicht möglichen Erkenntnisse a priori zu gelangen.

In jenem Versuche, das bisherige Verfahren der Metaphysik umzuändern, und dadurch, daß wir nach dem Beispiele der Geometer und Naturforscher eine gänzliche Revolution mit derselben vornehmen, besteht nun das Geschäfte dieser Kritik der reinen spekulativen Vernunft. Sie ist ein Traktat von der Methode, nicht ein System der Wissenschaft selbst; aber sie verzeichnet gleichwohl den ganzen Umriß derselben, so wohl in Ansehung ihrer Grenzen, als auch den ganzen inneren Gliederbau derselben.`,
        en: `This experiment succeeds as desired and promises to metaphysics, in its first part—which deals with concepts a priori whose corresponding objects can be given in experience—the secure path of a science.

But from this deduction of our faculty of cognizing a priori in the first part of metaphysics, there emerges a very strange result, and one that appears very disadvantageous to the whole purpose with which the second part of metaphysics concerns itself, namely that with this faculty we can never get beyond the boundaries of possible experience, which is precisely the most essential concern of this science.

Yet we still have remaining, after speculative reason has been denied all progress in this field of the supersensible, to try whether there are not data in reason's practical cognition for determining that transcendent concept of the unconditioned, and thus to get beyond the boundaries of all possible experience, in accordance with the wishes of metaphysics, with our knowledge a priori, which is possible only in a practical respect.

The task of this critique of pure speculative reason consists in that attempt to change the old procedure of metaphysics and to bring about a complete revolution, following the example of geometers and natural scientists. It is a treatise on the method, not a system of the science itself; but it catalogs the entire outline of the science of metaphysics, both as regards its boundaries and as regards its entire internal structure.`,
        zh: `这个实验如愿以偿地成功了，它让形而上学在其第一部分——即处理那些相应对象可以在经验中给予的先天概念——走上了科学的确定道路。

但是从形而上学第一部分中对我们先天认知能力的推演中，产生了一个非常奇特的结果，这个结果看似对形而上学第二部分所关注的整体目的非常不利，即我们永远无法超越可能经验的界限，而这恰恰是这门科学最本质的关注点。

然而，在思辨理性被否认在这个超感性领域中取得任何进展之后，我们仍然可以尝试在理性的实践认知中是否能找到数据来确定那个无条件者的超验概念，从而按照形而上学的愿望，通过我们的先天知识——这只有在实践方面才是可能的——超越所有可能经验的界限。

这部纯粹思辨理性批判的任务就在于尝试改变形而上学的旧有程序，并按照几何学家和自然科学家的榜样，在其中实现一场完全的革命。这是一部关于方法的论著，而不是科学体系本身；但它仍然勾画出了形而上学的整体轮廓，既涉及其界限，也涉及其整个内部结构。`,
      },
      content: `## The Limits of Metaphysics and Their Implications

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "This passage reveals a crucial tension in Kant's project: while his Copernican Revolution successfully establishes metaphysics as a science within the bounds of possible experience, it seemingly undermines metaphysics' traditional aim to transcend experience. However, Kant suggests that practical reason might offer a way to approach the unconditioned, even if theoretical reason cannot.",
      vocabulary: [
        {
          term: "das Unbedingte",
          definition: "The unconditioned",
          usage: "The absolute or ultimate reality that metaphysics traditionally seeks to know"
        },
        {
          term: "spekulative Vernunft",
          definition: "Speculative reason",
          usage: "Theoretical reason that attempts to know things beyond possible experience"
        },
        {
          term: "praktische Erkenntnis",
          definition: "Practical cognition",
          usage: "Knowledge related to moral action and practical concerns"
        },
        {
          term: "Grenze möglicher Erfahrung",
          definition: "Boundaries of possible experience",
          usage: "The limits within which theoretical knowledge is possible"
        }
      ],
      quiz: [
        {
          id: "metaphysics-limits-1",
          question: "What 'strange result' emerges from Kant's deduction of a priori cognition?",
          options: [
            "That metaphysics is impossible",
            "That we can never get beyond the boundaries of possible experience",
            "That practical reason is superior to theoretical reason",
            "That mathematics is the only true science"
          ],
          correctAnswer: 1,
          explanation: "Kant reveals that while we can have a priori knowledge, we can never transcend the boundaries of possible experience with theoretical reason, which seems to undermine traditional metaphysics."
        },
        {
          id: "metaphysics-limits-2",
          question: "What potential solution does Kant suggest for transcending the limits of experience?",
          options: [
            "Abandoning metaphysics entirely",
            "Using pure logic alone",
            "Finding data in practical reason",
            "Returning to pre-Copernican thinking"
          ],
          correctAnswer: 2,
          explanation: "Kant suggests that while speculative reason cannot transcend experience, we might find data in practical reason to determine the concept of the unconditioned."
        },
        {
          id: "metaphysics-limits-3",
          question: "How does Kant characterize his Critique of Pure Reason in this passage?",
          options: [
            "As a complete system of metaphysics",
            "As a treatise on method that outlines the boundaries and structure of metaphysics",
            "As a rejection of all previous philosophy",
            "As a purely practical guide"
          ],
          correctAnswer: 1,
          explanation: "Kant explicitly states that his Critique is a treatise on method, not a system of science itself, but one that outlines the boundaries and internal structure of metaphysics."
        }
      ],
      diagram: {
        title: "The Structure and Limits of Metaphysical Knowledge",
        description: "Visualization of Kant's conception of the boundaries of knowledge and the relationship between theoretical and practical reason",
        mermaidDefinition: `graph TB
    A[Knowledge] -->|Two Types| B[Theoretical Knowledge]
    A -->|Two Types| C[Practical Knowledge]
    
    B -->|Limited to| D["Bounds of Experience<br/>(Phenomena)"]
    B -->|Cannot Access| E["Things in Themselves<br/>(Noumena)"]
    
    C -->|May Access| F["The Unconditioned<br/>(Through Practical Reason)"]
    
    G[Metaphysics] -->|First Part| H["A Priori Concepts<br/>Within Experience"]
    G -->|Second Part| I["Transcendent Objects<br/>Beyond Experience"]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#e6e6fa
    style D fill:#f0f0f0
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#e6e6fa
    style H fill:#f0f0f0
    style I fill:#f0f0f0`
      }
    },
    {
      id: "critical-benefits",
      title: "Der positive Nutzen der Kritik",
      translations: {
        de: `Aber was ist denn das, wird man fragen, für ein Schatz, den wir der Nachkommenschaft, mit einer solchen durch Kritik geläuterten, dadurch aber auch in einen beharrlichen Zustand gebrachten Metaphysik, zu hinterlassen gedenken?

Man wird bei einer flüchtigen Übersicht dieses Werks wahrzunehmen glauben, daß der Nutzen davon doch nur negativ sei, uns nämlich mit der spekulativen Vernunft niemals über die Erfahrungsgrenze hinaus zu wagen, und das ist auch in der Tat ihr erster Nutzen.

Ich mußte also das Wissen aufheben, um zum Glauben Platz zu bekommen, und der Dogmatism der Metaphysik, d.i. das Vorurteil, in ihr ohne Kritik der reinen Vernunft fortzukommen, ist die wahre Quelle alles der Moralität widerstreitenden Unglaubens, der jederzeit gar sehr dogmatisch ist.

Denn irgend eine Metaphysik ist immer in der Welt gewesen, und wird auch wohl ferner, mit ihr aber auch eine Dialektik der reinen Vernunft, weil sie ihr natürlich ist, darin anzutreffen sein. Es ist also die erste und wichtigste Angelegenheit der Philosophie, einmal für allemal ihr dadurch, daß man die Quelle der Irrtümer verstopft, allen nachteiligen Einfluß zu benehmen.`,
        en: `But what, one will ask, is this treasure that we intend to bequeath to posterity in the form of a metaphysics that has been purified by critique and thereby brought into a permanent state?

At a cursory glance of this work, one might believe that its benefit is merely negative—namely, never to venture beyond the boundaries of experience with speculative reason—and this is indeed its first benefit.

I had to deny knowledge in order to make room for faith, and the dogmatism of metaphysics—that is, the prejudice that we can proceed in metaphysics without a critique of pure reason—is the true source of all unbelief conflicting with morality, which is always very dogmatic.

For there has always been some metaphysics or other in the world, and there will always continue to be one, and with it a dialectic of pure reason, because it is natural to reason. It is therefore the first and most important task of philosophy to deprive dialectic once and for all of all disadvantageous influence by stopping up the source of errors.`,
        zh: `但是人们会问，我们打算留给后人的这份经过批判净化并因此达到稳定状态的形而上学究竟是什么样的宝藏？

乍看这部著作，人们可能认为它的用处仅仅是消极的——即永远不让思辨理性冒险超越经验的界限——这确实是它的首要用处。

我不得不扬弃知识以为信仰留出空间，而形而上学的教条主义——即认为无需纯粹理性批判就能在形而上学中取得进展的偏见——是一切与道德相抵触的不信仰的真正源泉，这种不信仰总是极其教条的。

因为世界上总是存在某种形而上学，而且将来也会继续存在，与之相伴的还有纯粹理性的辩证法，因为这是理性的自然倾向。因此，哲学的首要和最重要的任务就是通过堵塞错误之源，一劳永逸地剥夺辩证法的所有不利影响。`,
      },
      content: `## The Positive Benefits of Critique

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "This passage reveals the ultimately positive aim of Kant's critical project. While it may appear merely negative in limiting knowledge to experience, this limitation actually serves to protect both morality and faith from dogmatic metaphysics. By showing that theoretical reason cannot prove or disprove things like God and freedom, Kant creates space for practical reason and moral faith.",
      vocabulary: [
        {
          term: "Schatz",
          definition: "Treasure",
          usage: "The metaphorical treasure of critical philosophy bequeathed to posterity"
        },
        {
          term: "Dogmatism",
          definition: "Dogmatism",
          usage: "The prejudice that metaphysics can proceed without critique"
        },
        {
          term: "Dialektik",
          definition: "Dialectic",
          usage: "The natural tendency of reason to go beyond its limits"
        },
        {
          term: "Unglauben",
          definition: "Unbelief",
          usage: "The skepticism that results from dogmatic metaphysics"
        }
      ],
      quiz: [
        {
          id: "critical-benefits-1",
          question: "What is the seemingly negative benefit of Kant's critique?",
          options: [
            "It destroys all metaphysics",
            "It limits speculative reason to the bounds of experience",
            "It proves that knowledge is impossible",
            "It shows that morality is an illusion"
          ],
          correctAnswer: 1,
          explanation: "The first benefit appears negative: it prevents speculative reason from venturing beyond the boundaries of experience."
        },
        {
          id: "critical-benefits-2",
          question: "Why does Kant say he had to 'deny knowledge'?",
          options: [
            "To promote ignorance",
            "To make room for faith",
            "To reject science",
            "To support skepticism"
          ],
          correctAnswer: 1,
          explanation: "Kant famously states that he had to deny (or limit) knowledge to make room for faith, showing how his critique actually protects religious and moral belief."
        },
        {
          id: "critical-benefits-3",
          question: "What does Kant identify as the source of unbelief conflicting with morality?",
          options: [
            "Critical philosophy",
            "Scientific knowledge",
            "Religious faith",
            "Dogmatic metaphysics"
          ],
          correctAnswer: 3,
          explanation: "Kant identifies dogmatic metaphysics—attempting metaphysics without critique—as the true source of unbelief that conflicts with morality."
        }
      ],
      diagram: {
        title: "The Positive Benefits of Kant's Critical Philosophy",
        description: "Visualization of how Kant's critique creates space for both knowledge and faith",
        mermaidDefinition: `graph TB
    A[Kant's Critical Philosophy] -->|Limits| B[Speculative Reason]
    A -->|Creates Space for| C[Practical Reason]
    
    B -->|Confined to| D[Experience/Phenomena]
    B -->|Cannot Prove/Disprove| E[Things in Themselves]
    
    C -->|Grounds| F[Moral Faith]
    C -->|Enables| G[Freedom]
    
    H[Dogmatic Metaphysics] -->|Leads to| I[Unbelief]
    H -->|Threatens| J[Morality]
    
    K[Critical Method] -->|Prevents| H
    K -->|Protects| L[Both Knowledge & Faith]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#e6e6fa
    style D fill:#f0f0f0
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#e6e6fa
    style H fill:#f0f0f0
    style I fill:#f0f0f0
    style J fill:#f0f0f0
    style K fill:#e6e6fa
    style L fill:#e6e6fa`
      }
    },
    {
      id: "schools-and-public",
      title: "Die Schulen und das Publikum",
      translations: {
        de: `Bei dieser wichtigen Veränderung im Felde der Wissenschaften, und dem Verluste, den spekulative Vernunft an ihrem bisher eingebildeten Besitze erleiden muß, bleibt dennoch alles mit der allgemeinen menschlichen Angelegenheit, und dem Nutzen, den die Welt bisher aus den Lehren der reinen Vernunft zog, in demselben vorteilhaften Zustande, als es jemalen war, und der Verlust trifft nur das Monopol der Schulen, keinesweges aber das Interesse der Menschen.

Die Kritik ist nicht dem dogmatischen Verfahren der Vernunft in ihrem reinen Erkenntnis, als Wissenschaft, entgegengesetzt, sondern dem Dogmatism, d.i. der Anmaßung, mit einer reinen Erkenntnis aus Begriffen (der philosophischen), nach Prinzipien, so wie sie die Vernunft längst im Gebrauche hat, ohne Erkundigung der Art und des Rechts, womit sie dazu gelanget ist, allein fortzukommen.

Durch diese kann nun allein dem Materialism, Fatalism, Atheism, dem freigeisterischen Unglauben, der Schwärmerei und Aberglauben, die allgemein schädlich werden können, zuletzt auch dem Idealism und Skeptizism, die mehr den Schulen gefährlich sind, und schwerlich ins Publikum übergehen können, selbst die Wurzel abgeschnitten werden.`,
        en: `Despite this important change in the field of sciences, and the loss that speculative reason must suffer in its hitherto imagined possessions, everything remains in the same advantageous condition as before regarding general human concerns and the benefit that the world has drawn from the teachings of pure reason. The loss affects only the monopoly of the schools, but in no way the interests of humanity.

Critique is not opposed to the dogmatic procedure of reason in its pure cognition as science, but rather to dogmatism, i.e., to the presumption of getting along solely with pure cognition from concepts according to principles that reason has long been using, without first inquiring in what way and by what right it has attained to them.

Through this alone can materialism, fatalism, atheism, free-thinking unbelief, enthusiasm and superstition, which can become generally injurious, and finally also idealism and skepticism, which are more dangerous to the schools and can hardly pass over to the public, be cut off at the very root.`,
        zh: `尽管科学领域发生了这一重要变革，思辨理性必须在其迄今想象的占有物上蒙受损失，但关于一般人类事务和世界迄今从纯粹理性教导中获得的益处，一切仍保持着与以往同样有利的状态。这种损失只影响学院的垄断，而绝不影响人类的利益。

批判并不是与作为科学的纯粹认识中理性的教条式程序相对立，而是与教条主义相对立，即与这样一种僭越相对立：仅仅依据理性长期使用的原则，用纯粹概念认识（哲学的认识）继续前进，而不首先探究它以何种方式和何种权利达到这些原则。

只有通过这种方式，才能从根本上切断唯物主义、宿命论、无神论、自由思想的不信仰、狂热和迷信（这些都可能普遍有害），最后还有唯心主义和怀疑主义（这些对学院更危险，但很难传播到公众中）。`,
      },
      content: `## The Schools and the Public: Critique's Double Task

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "Kant makes a crucial distinction between academic philosophy ('the schools') and public understanding. While his critique limits speculative reason's pretensions, it actually protects and preserves the common person's moral and religious beliefs. The critique serves a double function: it both limits dogmatic metaphysics in academia while safeguarding practical reason for the public.",
      vocabulary: [
        {
          term: "Dogmatism",
          definition: "Dogmatism",
          usage: "The presumption of using pure reason without first examining its limits and rights"
        },
        {
          term: "Monopol der Schulen",
          definition: "Monopoly of the schools",
          usage: "The academic establishment's claim to exclusive knowledge of metaphysical truths"
        },
        {
          term: "Schwärmerei",
          definition: "Enthusiasm/Fanaticism",
          usage: "Excessive religious or philosophical zeal unconstrained by critical reflection"
        },
        {
          term: "Materialism",
          definition: "Materialism",
          usage: "The view that only material things exist, which Kant sees as a threat to morality"
        }
      ],
      quiz: [
        {
          id: "schools-public-1",
          question: "According to Kant, who is primarily affected by the loss that his critique imposes on speculative reason?",
          options: [
            "The general public",
            "Religious believers",
            "The academic schools",
            "Scientific researchers"
          ],
          correctAnswer: 2,
          explanation: "Kant explicitly states that the loss affects only the 'monopoly of the schools' (academic institutions), not the interests of humanity in general."
        },
        {
          id: "schools-public-2",
          question: "What is Kant's critique primarily opposed to?",
          options: [
            "All forms of dogmatic reasoning",
            "Scientific method",
            "Popular understanding",
            "Dogmatism as presumptuous use of reason without prior critique"
          ],
          correctAnswer: 3,
          explanation: "Kant distinguishes between legitimate dogmatic procedure in science and illegitimate dogmatism that proceeds without first examining reason's rights and limits."
        },
        {
          id: "schools-public-3",
          question: "Which threats does Kant say are more dangerous to the schools than to the public?",
          options: [
            "Materialism and fatalism",
            "Atheism and superstition",
            "Idealism and skepticism",
            "Enthusiasm and unbelief"
          ],
          correctAnswer: 2,
          explanation: "Kant specifically identifies idealism and skepticism as more dangerous to the schools and unlikely to pass over to the public."
        }
      ],
      diagram: {
        title: "Kant's Two-Level Defense of Reason",
        description: "Visualization of how Kant's critique operates differently at academic and public levels",
        mermaidDefinition: `graph TB
    A[Kant's Critique] -->|Limits| B[Academic Philosophy]
    A -->|Protects| C[Public Understanding]
    
    B -->|Restricts| D[Dogmatic Metaphysics]
    B -->|Prevents| E[Idealism & Skepticism]
    
    C -->|Preserves| F[Moral Beliefs]
    C -->|Safeguards| G[Religious Faith]
    C -->|Maintains| H[Common Reason]
    
    I[Critical Method] -->|Cuts off at root| J[Harmful Doctrines]
    J -->|Academic Threats| K[Idealism/Skepticism]
    J -->|Public Threats| L[Materialism/Atheism]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#e6e6fa
    style D fill:#f0f0f0
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#e6e6fa
    style H fill:#e6e6fa
    style I fill:#e6e6fa
    style J fill:#f0f0f0
    style K fill:#f0f0f0
    style L fill:#f0f0f0`
      }
    },
    {
      id: "second-edition",
      title: "Zur zweiten Auflage",
      translations: {
        de: `Was diese zweite Auflage betrifft, so habe ich, wie billig, die Gelegenheit derselben nicht vorbeilassen wollen, um den Schwierigkeiten und der Dunkelheit so viel möglich abzuhelfen, woraus manche Mißdeutungen entsprungen sein mögen, welche scharfsinnigen Männern, vielleicht nicht ohne meine Schuld, in der Beurteilung dieses Buchs aufgestoßen sind.

In den Sätzen selbst und ihren Beweisgründen, imgleichen der Form sowohl als der Vollständigkeit des Plans, habe ich nichts zu ändern gefunden; welches teils der langen Prüfung, der ich sie unterworfen hatte, ehe ich es dem Publikum vorlegte, teils der Beschaffenheit der Sache selbst, nämlich der Natur einer reinen spekulativen Vernunft, beizumessen ist, die einen wahren Gliederbau enthält, worin alles Organ ist.

Allein in der Darstellung ist noch viel zu tun, und hierin habe ich mit dieser Auflage Verbesserungen versucht, welche teils dem Mißverstande der Ästhetik, vornehmlich dem im Begriffe der Zeit, teils der Dunkelheit der Deduktion der Verstandesbegriffe, teils dem vermeintlichen Mangel einer genugsamen Evidenz in den Beweisen der Grundsätze des reinen Verstandes, teils endlich der Mißdeutung der der rationalen Psychologie vorgerückten Paralogismen abhelfen sollen.`,
        en: `Regarding this second edition, I have not, as is proper, let pass the opportunity to remedy as far as possible the difficulties and obscurity from which may have sprung many misinterpretations which sharp-minded men, perhaps not without some fault of my own, have encountered in judging this book.

I have found nothing to alter in the propositions themselves or in their grounds of proof, nor in the form and completeness of the plan; this is to be attributed partly to the long examination to which I subjected them before presenting it to the public, and partly to the nature of the matter itself, namely the nature of pure speculative reason, which contains a true organic structure wherein everything is an organ.

Yet much remains to be done in the presentation, and in this edition I have attempted improvements which should remedy the misunderstanding of the Aesthetic, especially concerning the concept of time, the obscurity of the deduction of the concepts of understanding, the supposed lack of sufficient evidence in the proofs of the principles of pure understanding, and finally the misinterpretation of the paralogisms advanced against rational psychology.`,
        zh: `关于这第二版，我没有错过这个适当的机会，尽可能地消除那些困难和晦涩之处，这些可能导致了一些误解，使得一些敏锐的人士在判断这本书时遇到了困难，这或许也有我的责任。

对于命题本身及其证明根据，以及计划的形式和完整性，我都没有发现需要改变的地方；这部分要归因于我在将其呈现给公众之前进行的长期审查，部分要归因于事物本身的性质，即纯粹思辨理性的本质，它包含着一个真正的有机结构，其中的每个部分都是器官。

然而在表述方面还有很多工作要做，在这版中我试图做出改进，这些改进应该能够纠正对美学的误解，特别是关于时间概念的误解，以及知性概念演绎的晦涩性，纯粹知性原则证明中所谓的证据不足，最后是对理性心理学预设的谬误推理的误解。`,
      },
      content: `## On Clear Communication in Philosophy

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this preface to the second edition, Kant demonstrates his commitment to clear communication while maintaining philosophical rigor. He acknowledges that while the core arguments and structure of his critique remain sound, the presentation needed improvement to prevent misunderstandings. This shows his recognition that an author bears responsibility for making complex ideas accessible without compromising their essential truth.",
      vocabulary: [
        {
          term: "Darstellung",
          definition: "Presentation/exposition",
          usage: "The way ideas are communicated and explained"
        },
        {
          term: "Gliederbau",
          definition: "Organic structure",
          usage: "The systematic interconnection of all parts in a philosophical system"
        },
        {
          term: "Mißdeutungen",
          definition: "Misinterpretations",
          usage: "Wrong understandings that arise from unclear presentation"
        },
        {
          term: "Dunkelheit",
          definition: "Obscurity",
          usage: "Lack of clarity in philosophical exposition"
        }
      ],
      quiz: [
        {
          id: "second-edition-1",
          question: "What does Kant say about the core content of his work in the second edition?",
          options: [
            "He made substantial changes to the arguments",
            "He found nothing to alter in the propositions and proofs",
            "He completely restructured the work",
            "He removed controversial sections"
          ],
          correctAnswer: 1,
          explanation: "Kant explicitly states that he found nothing to alter in the propositions themselves or their grounds of proof, attributing this to thorough examination before initial publication."
        },
        {
          id: "second-edition-2",
          question: "What was the main focus of Kant's revisions in the second edition?",
          options: [
            "The basic arguments",
            "The overall structure",
            "The presentation and clarity",
            "The conclusions"
          ],
          correctAnswer: 2,
          explanation: "Kant focused on improving the presentation to remedy misunderstandings, particularly in areas like the Aesthetic and the deduction of concepts."
        },
        {
          id: "second-edition-3",
          question: "How does Kant view his responsibility for previous misunderstandings?",
          options: [
            "He blames the readers entirely",
            "He accepts no responsibility",
            "He acknowledges it may be partly his fault",
            "He blames the complexity of the subject"
          ],
          correctAnswer: 2,
          explanation: "Kant acknowledges that the misinterpretations by sharp-minded readers may have been 'perhaps not without some fault of my own.'"
        }
      ],
      diagram: {
        title: "Kant's Approach to Philosophical Communication",
        description: "Visualization of Kant's balance between content and presentation in the second edition",
        mermaidDefinition: `graph TB
    A[Critique of Pure Reason] -->|Maintains| B[Core Content]
    A -->|Improves| C[Presentation]
    
    B -->|Preserves| D[Arguments]
    B -->|Preserves| E[System Structure]
    B -->|Preserves| F[Proofs]
    
    C -->|Clarifies| G[Aesthetic]
    C -->|Clarifies| H[Deduction]
    C -->|Clarifies| I[Evidence]
    C -->|Clarifies| J[Paralogisms]
    
    K[Author's Responsibility] -->|Balance| L[Truth]
    K -->|Balance| M[Clarity]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#e6e6fa
    style D fill:#f0f0f0
    style E fill:#f0f0f0
    style F fill:#f0f0f0
    style G fill:#e6e6fa
    style H fill:#e6e6fa
    style I fill:#e6e6fa
    style J fill:#e6e6fa
    style K fill:#e6e6fa
    style L fill:#f0f0f0
    style M fill:#f0f0f0`
      }
    },
    {
      id: "pure-empirical",
      title: "Von dem Unterschiede der reinen und empirischen Erkenntnis",
      translations: {
        de: `Daß alle unsere Erkenntnis mit der Erfahrung anfange, daran ist gar kein Zweifel; denn wodurch sollte das Erkenntnisvermögen sonst zur Ausübung erweckt werden, geschähe es nicht durch Gegenstände, die unsere Sinne rühren und teils von selbst Vorstellungen bewirken, teils unsere Verstandestätigkeit in Bewegung bringen, diese zu vergleichen, sie zu verknüpfen oder zu trennen, und so den rohen Stoff sinnlicher Eindrücke zu einer Erkenntnis der Gegenstände zu verarbeiten, die Erfahrung heißt?

Wenn aber gleich alle unsere Erkenntnis mit der Erfahrung anhebt, so entspringt sie darum doch nicht eben alle aus der Erfahrung. Denn es könnte wohl sein, daß selbst unsere Erfahrungserkenntnis ein Zusammengesetztes aus dem sei, was wir durch Eindrücke empfangen, und dem, was unser eigenes Erkenntnisvermögen aus sich selbst hergibt.`,
        en: `That all our knowledge begins with experience there can be no doubt. For how should our faculty of knowledge be awakened into action did not objects affecting our senses partly of themselves produce representations, partly arouse the activity of our understanding to compare these representations, and, by combining or separating them, work up the raw material of sensible impressions into that knowledge of objects which is entitled experience?

But though all our knowledge begins with experience, it does not follow that it all arises from experience. For it may well be that even our empirical knowledge is made up of what we receive through impressions and of what our own faculty of knowledge supplies from itself.`,
        zh: `毫无疑问，我们所有的知识都始于经验；因为，若不是通过触动我们感官的对象，一方面自行产生表象，另一方面推动我们知性活动去比较这些表象，把它们联结起来或分开，从而把感性印象的原始材料加工成为我们称之为经验的对象知识，那么我们的认知能力又怎能被唤醒而运作呢？

然而，虽然我们所有的知识都始于经验，但并非所有知识都来源于经验。因为很可能我们的经验知识本身就是一个复合物，由我们通过印象所接受的东西，以及我们自己的认知能力所提供的东西组成。`,
      },
      content: `## The Foundation of Kant's Critical Philosophy

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "This opening passage of the Introduction establishes the fundamental tension that drives Kant's entire critical project: while all knowledge begins with experience, not all knowledge arises from experience. This distinction between the temporal origin of knowledge and its logical justification sets up Kant's investigation of synthetic a priori knowledge - judgments that are both necessary and experience-independent yet informative about the world.",
      vocabulary: [
        {
          term: "Erkenntnis",
          definition: "Knowledge/cognition",
          usage: "The faculty of understanding and knowing"
        },
        {
          term: "Erfahrung",
          definition: "Experience",
          usage: "Empirical encounter with objects through the senses"
        },
        {
          term: "Erkenntnisvermögen",
          definition: "Faculty of knowledge",
          usage: "The mind's capacity to know and understand"
        },
        {
          term: "a priori",
          definition: "Prior to/independent of experience",
          usage: "Knowledge that is justified independently of experience"
        },
        {
          term: "a posteriori",
          definition: "After/dependent on experience",
          usage: "Knowledge derived from experience"
        }
      ],
      quiz: [
        {
          id: "pure-empirical-1",
          question: "According to Kant, what is the relationship between knowledge and experience?",
          options: [
            "All knowledge comes from experience",
            "No knowledge comes from experience",
            "All knowledge begins with but not all arises from experience",
            "Experience is irrelevant to knowledge"
          ],
          correctAnswer: 2,
          explanation: "Kant makes a crucial distinction between knowledge beginning with experience (which all knowledge does) and arising from experience (which not all knowledge does)."
        },
        {
          id: "pure-empirical-2",
          question: "What awakens our faculty of knowledge according to Kant?",
          options: [
            "Pure reason alone",
            "Objects affecting our senses",
            "Innate ideas",
            "Divine inspiration"
          ],
          correctAnswer: 1,
          explanation: "Kant states that our faculty of knowledge is awakened by objects affecting our senses, which produce representations and stimulate understanding."
        }
      ],
      diagram: {
        title: "Kant's Theory of Knowledge",
        description: "Visualization of the relationship between experience and knowledge in Kant's philosophy",
        mermaidDefinition: `graph TB
    A[Knowledge] --> B[Temporal Origin]
    A --> C[Logical Source]
    
    B --> D[Begins with Experience]
    
    C --> E[Arises from Experience]
    C --> F[Arises Independent of Experience]
    
    E --> G[A Posteriori Knowledge]
    F --> H[A Priori Knowledge]
    
    H --> I[Pure: No Empirical Content]
    H --> J[Impure: Some Empirical Content]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#f0f0f0
    style F fill:#f0f0f0
    style G fill:#e6e6fa
    style H fill:#e6e6fa
    style I fill:#f0f0f0
    style J fill:#f0f0f0`
      }
    },
    {
      id: "a-priori-criteria",
      title: "Die Kennzeichen der Erkenntnis a priori",
      translations: {
        de: `Es kommt hier auf ein Merkmal an, woran wir sicher ein reines Erkenntnis von empirischen unterscheiden können. Erfahrung lehrt uns zwar, daß etwas so oder so beschaffen sei, aber nicht, daß es nicht anders sein könne.

Findet sich also erstlich ein Satz, der zugleich mit seiner Notwendigkeit gedacht wird, so ist er ein Urteil a priori; ist er überdem auch von keinem abgeleitet, als der selbst wiederum als ein notwendiger Satz gültig ist, so ist er schlechterdings a priori.

Zweitens: Erfahrung gibt niemals ihren Urteilen wahre oder strenge, sondern nur angenommene und komparative Allgemeinheit (durch Induktion), so daß es eigentlich heißen muß: so viel wir bisher wahrgenommen haben, findet sich von dieser oder jener Regel keine Ausnahme.`,
        en: `Here we are concerned with a mark by which we can securely distinguish pure from empirical knowledge. Experience teaches us that something is constituted in such and such a way, but not that it could not be otherwise.

First, then, if we have a proposition that is thought along with its necessity, it is an a priori judgment; if it is, moreover, not derived from any proposition except one that also holds as a necessary proposition, then it is absolutely a priori.

Second, experience never gives its judgments true or strict universality but only assumed and comparative universality (through induction), so that properly it must be said: as far as we have yet perceived, there is no exception to this or that rule.`,
        zh: `在这里，我们关注的是一个能让我们确切地区分纯粹知识和经验知识的标志。经验告诉我们某物是如此这般构成的，但并不告诉我们它不可能是其他样子。

首先，如果我们有一个命题，它的必然性是与它一起被思考的，那么它就是先验判断；而且，如果它不是从任何命题推导出来的，除非那个命题本身也是必然的，那么它就是绝对先验的。

其次，经验从不给予其判断真正的或严格的普遍性，而只给予假定的和比较的普遍性（通过归纳），因此严格来说必须说：就我们迄今所观察到的而言，这个或那个规则没有例外。`,
      },
      content: `## The Criteria of A Priori Knowledge

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this section, Kant establishes two key criteria for identifying a priori knowledge: necessity and strict universality. These marks distinguish a priori knowledge from empirical knowledge, which can only provide comparative universality through induction. This distinction is crucial for understanding how synthetic a priori judgments are possible, as discussed in detail by scholars examining Kant's epistemology.",
      vocabulary: [
        {
          term: "Notwendigkeit",
          definition: "Necessity",
          usage: "A characteristic of a priori knowledge where something could not be otherwise"
        },
        {
          term: "strenge Allgemeinheit",
          definition: "Strict universality",
          usage: "Universal validity without possible exceptions"
        },
        {
          term: "komparative Allgemeinheit",
          definition: "Comparative universality",
          usage: "Generalization based on observed cases"
        },
        {
          term: "Induktion",
          definition: "Induction",
          usage: "Method of reasoning from particular instances to general conclusions"
        }
      ],
      quiz: [
        {
          id: "a-priori-1",
          question: "What are Kant's two criteria for identifying a priori knowledge?",
          options: [
            "Experience and observation",
            "Necessity and strict universality",
            "Logic and mathematics",
            "Induction and deduction"
          ],
          correctAnswer: 1,
          explanation: "Kant identifies two key marks of a priori knowledge: necessity (that something could not be otherwise) and strict universality (that it admits of no possible exceptions)."
        },
        {
          id: "a-priori-2",
          question: "How does Kant characterize the universality provided by experience?",
          options: [
            "Strict and necessary",
            "Absolute and certain",
            "Comparative and assumed",
            "Pure and a priori"
          ],
          correctAnswer: 2,
          explanation: "According to Kant, experience can only provide comparative and assumed universality through induction, not the strict universality characteristic of a priori knowledge."
        }
      ],
      diagram: {
        title: "Kant's Theory of A Priori Knowledge",
        description: "Visualization of the distinction between a priori and empirical knowledge",
        mermaidDefinition: `graph TB
    A[Knowledge] --> B[A Priori Knowledge]
    A --> C[Empirical Knowledge]
    
    B --> D[Necessity]
    B --> E[Strict Universality]
    
    C --> F[Contingency]
    C --> G[Comparative Universality]
    
    D --> H[Cannot Be Otherwise]
    E --> I[No Possible Exceptions]
    
    F --> J[Could Be Otherwise]
    G --> K[Based on Observation]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#e6e6fa
    style F fill:#f0f0f0
    style G fill:#f0f0f0
    style H fill:#e6e6fa
    style I fill:#e6e6fa
    style J fill:#f0f0f0
    style K fill:#f0f0f0`
      }
    },
    {
      id: "need-for-critique",
      title: "Die Notwendigkeit einer Kritik der reinen Vernunft",
      translations: {
        de: `Was noch weit mehr sagen will, als alles vorige, ist dieses, daß gewisse Erkenntnisse sogar das Feld aller möglichen Erfahrungen verlassen, und durch Begriffe, denen überall kein entsprechender Gegenstand in der Erfahrung gegeben werden kann, den Umfang unserer Urteile über alle Grenzen derselben zu erweitern den Anschein haben.

Diese unvermeidlichen Aufgaben der reinen Vernunft selbst sind Gott, Freiheit und Unsterblichkeit. Die Wissenschaft aber, deren Endabsicht mit allen ihren Zurüstungen eigentlich nur auf die Auflösung derselben gerichtet ist, heißt Metaphysik, deren Verfahren im Anfange dogmatisch ist.

Die leichte Taube, indem sie im freien Fluge die Luft teilt, deren Widerstand sie fühlt, könnte die Vorstellung fassen, daß es ihr im luftleeren Raum noch viel besser gelingen werde. Eben so verließ Plato die Sinnenwelt, weil sie dem Verstande so enge Schranken setzt, und wagte sich jenseit derselben, auf den Flügeln der Ideen, in den leeren Raum des reinen Verstandes.`,
        en: `What is far more significant than all the foregoing is this: certain modes of knowledge leave the field of all possible experience and seem to extend the scope of our judgments beyond all bounds of experience through concepts to which no corresponding object can be given in experience.

These unavoidable problems of pure reason itself are God, freedom, and immortality. The science whose true aim is the solution of these problems is called metaphysics; its procedure is at first dogmatic, that is, it confidently undertakes this task without any previous examination of reason's capacity or incapacity for such a great undertaking.

The light dove, cleaving the air in her free flight and feeling its resistance, might imagine that its flight would be still easier in empty space. It was thus that Plato left the world of the senses, as setting too narrow limits to the understanding, and ventured out beyond it on the wings of the ideas, in the empty space of pure understanding.`,
        zh: `比前面所说的更为重要的是：某些认知甚至超出了所有可能经验的领域，并且通过那些在经验中完全找不到相应对象的概念，似乎要将我们判断的范围扩展到经验的一切界限之外。

纯粹理性本身的这些不可避免的任务就是上帝、自由和不朽。而以解决这些问题为最终目的的科学就叫做形而上学，它一开始采用教条式的方法。

轻盈的鸽子在自由飞翔时分开空气，感受到空气的阻力，可能会产生这样的想象：在真空中它会飞得更好。同样，柏拉图离开了感性世界，因为这个世界给知性设置了太多狭隘的限制，他凭借理念之翼冒险飞向纯粹知性的空虚空间。`,
      },
      content: `## The Need for a Critical Science

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this pivotal section, Kant introduces the central problem that motivates his critical project: reason's natural tendency to extend beyond the bounds of possible experience to questions about God, freedom, and immortality. His famous metaphor of the dove illustrates how reason, like a bird that imagines it could fly better without air resistance, mistakenly believes it can achieve more by abandoning the constraints of sensible experience.",
      vocabulary: [
        {
          term: "Metaphysik",
          definition: "Metaphysics",
          usage: "The science aimed at solving questions about God, freedom, and immortality"
        },
        {
          term: "dogmatisch",
          definition: "Dogmatic",
          usage: "Proceeding without first examining the capacity of reason"
        },
        {
          term: "Sinnenwelt",
          definition: "World of the senses",
          usage: "The realm of sensible experience"
        },
        {
          term: "reine Vernunft",
          definition: "Pure reason",
          usage: "Reason operating independently of experience"
        }
      ],
      quiz: [
        {
          id: "metaphysics-1",
          question: "What are the three unavoidable problems of pure reason according to Kant?",
          options: [
            "Truth, beauty, and goodness",
            "Space, time, and causality",
            "God, freedom, and immortality",
            "Mind, body, and spirit"
          ],
          correctAnswer: 2,
          explanation: "Kant identifies God, freedom, and immortality as the three unavoidable problems that pure reason naturally seeks to address."
        },
        {
          id: "metaphysics-2",
          question: "What does Kant's dove metaphor illustrate?",
          options: [
            "The success of pure reason",
            "The limits of sensible experience",
            "The power of empirical knowledge",
            "Reason's mistaken belief that it can achieve more without sensible constraints"
          ],
          correctAnswer: 3,
          explanation: "The dove metaphor shows how reason, like a bird thinking it could fly better without air resistance, wrongly believes it can achieve more by abandoning experiential constraints."
        }
      ],
      diagram: {
        title: "Kant's Critique of Traditional Metaphysics",
        description: "Visualization of reason's tendency to transcend experience",
        mermaidDefinition: `graph TB
    A[Pure Reason] --> B[Within Experience]
    A --> C[Beyond Experience]
    
    B --> D[Scientific Knowledge]
    B --> E[Valid Metaphysics]
    
    C --> F[Traditional Metaphysics]
    F --> G[God]
    F --> H[Freedom]
    F --> I[Immortality]
    
    J[Critical Philosophy] --> K[Examines Limits]
    K --> L[Prevents Error]
    K --> M[Secures Knowledge]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#e6e6fa
    style F fill:#f0f0f0
    style G fill:#f0f0f0
    style H fill:#f0f0f0
    style I fill:#f0f0f0
    style J fill:#e6e6fa
    style K fill:#e6e6fa
    style L fill:#f0f0f0
    style M fill:#f0f0f0`
      }
    },
    {
      id: "analytic-synthetic",
      title: "Von dem Unterschiede analytischer und synthetischer Urteile",
      translations: {
        de: `In allen Urteilen, worinnen das Verhältnis eines Subjekts zum Prädikat gedacht wird, ist dieses Verhältnis auf zweierlei Art möglich. Entweder das Prädikat B gehört zum Subjekt A als etwas, was in diesem Begriffe A (versteckter Weise) enthalten ist; oder B liegt ganz außer dem Begriff A, ob es zwar mit demselben in Verknüpfung steht.

Im ersten Fall nenne ich das Urteil analytisch, in dem andern synthetisch. Analytische Urteile sind also diejenige, in welchen die Verknüpfung des Prädikats mit dem Subjekt durch Identität gedacht wird.

Z.B. wenn ich sage: alle Körper sind ausgedehnt, so ist dies ein analytisch Urteil. Dagegen, wenn ich sage: alle Körper sind schwer, so ist das Prädikat etwas ganz anderes, als das, was ich in dem bloßen Begriff eines Körpers überhaupt denke.`,
        en: `In all judgments wherein the relation of a subject to the predicate is thought, this relation is possible in two different ways. Either the predicate B belongs to the subject A as something that is (covertly) contained in this concept A; or B lies entirely outside the concept A, although it stands in connection with it.

In the first case, I call the judgment analytic, in the second synthetic. Analytic judgments are those in which the connection of the predicate with the subject is thought through identity.

For example, when I say: "all bodies are extended," this is an analytic judgment. But when I say: "all bodies are heavy," the predicate is something quite different from what I think in the mere concept of a body in general.`,
        zh: `在所有主谓关系的判断中，这种关系可能有两种方式。要么谓词B属于主词A，作为某种（隐含地）包含在概念A中的东西；要么B完全在概念A之外，尽管与之有联系。

在第一种情况下，我称之为分析判断，在第二种情况下，称之为综合判断。分析判断是那些通过同一性来思考谓词与主词之间联系的判断。

例如，当我说："所有物体都是广延的"，这是一个分析判断。但当我说："所有物体都是有重量的"，这个谓词与我在一般物体概念中所想的完全不同。`,
      },
      content: `## The Distinction Between Analytic and Synthetic Judgments

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "This section introduces one of Kant's most influential philosophical distinctions. In analytic judgments, the predicate is already contained in the subject concept (like 'bodies are extended'), while in synthetic judgments, the predicate adds new information not contained in the subject concept (like 'bodies are heavy'). This distinction is crucial for understanding how knowledge is possible and sets up Kant's investigation of synthetic a priori judgments [[memory:MEMORY_ID]].",
      vocabulary: [
        {
          term: "analytische Urteile",
          definition: "Analytic judgments",
          usage: "Judgments where the predicate is contained in the subject concept"
        },
        {
          term: "synthetische Urteile",
          definition: "Synthetic judgments",
          usage: "Judgments where the predicate adds new information to the subject concept"
        },
        {
          term: "Identität",
          definition: "Identity",
          usage: "The logical relationship in analytic judgments"
        },
        {
          term: "Erweiterungsurteile",
          definition: "Ampliative judgments",
          usage: "Another term for synthetic judgments, emphasizing how they extend our knowledge"
        }
      ],
      quiz: [
        {
          id: "judgment-1",
          question: "According to Kant, what makes a judgment analytic?",
          options: [
            "It is based on experience",
            "It connects unrelated concepts",
            "The predicate is contained in the subject concept",
            "It requires empirical observation"
          ],
          correctAnswer: 2,
          explanation: "Kant defines analytic judgments as those where the predicate concept is already contained (though perhaps covertly) in the subject concept."
        },
        {
          id: "judgment-2",
          question: "Which of Kant's examples is a synthetic judgment?",
          options: [
            "All bodies are extended",
            "All bodies are heavy",
            "All triangles have three sides",
            "All bachelors are unmarried"
          ],
          correctAnswer: 1,
          explanation: "'All bodies are heavy' is synthetic because the concept of weight is not contained in the mere concept of a body and must be discovered through experience."
        }
      ],
      diagram: {
        title: "Kant's Theory of Judgments",
        description: "Visual representation of the analytic/synthetic distinction",
        mermaidDefinition: `graph TB
    A[Judgments] --> B[Analytic]
    A --> C[Synthetic]
    
    B --> D[Predicate contained in subject]
    B --> E[Example: Bodies are extended]
    B --> F[Clarifies concepts]
    
    C --> G[Predicate adds new information]
    C --> H[Example: Bodies are heavy]
    C --> I[Extends knowledge]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#e6e6fa
    style H fill:#f0f0f0
    style I fill:#e6e6fa`
      }
    },
    {
      id: "synthetic-a-priori",
      title: "Die synthetischen Urteile a priori in den Wissenschaften",
      translations: {
        de: `1. Mathematische Urteile sind insgesamt synthetisch. Dieser Satz scheint den Bemerkungen der Zergliederer der menschlichen Vernunft bisher entgangen, ja allen ihren Vermutungen gerade entgegengesetzt zu sein, ob er gleich unwidersprechlich gewiß und in der Folge sehr wichtig ist.

Man sollte anfänglich zwar denken daß der Satz 7+5=12 ein bloß analytischer Satz sei, der aus dem Begriffe einer Summe von Sieben und Fünf nach dem Satze des Widerspruches erfolge. Allein, wenn man es näher betrachtet, so findet man, daß der Begriff der Summe von 7 und 5 nichts weiter enthalte, als die Vereinigung beider Zahlen in eine einzige, wodurch ganz und gar nicht gedacht wird, welches diese einzige Zahl sei, die beide zusammenfaßt.

Die eigentliche Aufgabe der reinen Vernunft ist nun in der Frage enthalten: Wie sind synthetische Urteile a priori möglich?`,
        en: `1. Mathematical judgments are all synthetic. This proposition seems to have escaped the notice of all analysts of human reason, indeed to be directly opposed to all their conjectures, although it is incontrovertibly certain and very important in its consequences.

One might indeed at first think that the proposition 7+5=12 is a merely analytic proposition that follows from the concept of a sum of seven and five by the principle of contradiction. However, if one considers it more closely, one finds that the concept of the sum of 7 and 5 contains nothing more than the union of these two numbers into one, and in this no thought is being given to what that single number might be that combines both.

The proper problem of pure reason is contained in the question: How are synthetic judgments a priori possible?`,
        zh: `1. 数学判断都是综合的。这个命题似乎迄今为止都被人类理性的分析者们所忽视，实际上与他们所有的推测都相反，尽管它是无可争议的确定的，而且在其结果上非常重要。

人们起初可能会认为7+5=12这个命题只是一个分析命题，它是根据矛盾律从7和5的和的概念中推导出来的。然而，如果仔细考察，就会发现7和5的和的概念中只包含这两个数合并为一个数，但完全没有思考这个合并后的数到底是什么。

纯粹理性的真正任务包含在这个问题中：先天综合判断如何可能？`,
      },
      content: `## The Problem of Synthetic A Priori Knowledge

### German Text
{translations.de}

### English Translation
{translations.en}

### Chinese Translation
{translations.zh}`,
      insight: "In this pivotal section, Kant demonstrates that mathematics contains synthetic a priori judgments, using the famous example of '7+5=12'. This leads to his central question: how are such judgments possible? This question defines the entire project of the Critique of Pure Reason, as it seeks to explain how we can have knowledge that is both necessary (a priori) and informative (synthetic).",
      vocabulary: [
        {
          term: "synthetische Urteile a priori",
          definition: "Synthetic a priori judgments",
          usage: "Judgments that are both necessary and informative, like mathematical truths"
        },
        {
          term: "Anschauung",
          definition: "Intuition",
          usage: "The mental faculty needed to grasp mathematical truths"
        },
        {
          term: "reine Vernunft",
          definition: "Pure reason",
          usage: "The faculty of reason operating independently of experience"
        },
        {
          term: "Zergliederung",
          definition: "Analysis",
          usage: "The process of breaking down concepts into their components"
        }
      ],
      quiz: [
        {
          id: "math-1",
          question: "Why does Kant claim that '7+5=12' is a synthetic judgment?",
          options: [
            "Because it is based on experience",
            "Because it follows from the law of contradiction",
            "Because the concept of 12 is not contained in the mere concept of adding 7 and 5",
            "Because it is not necessarily true"
          ],
          correctAnswer: 2,
          explanation: "Kant argues that the concept of '12' is not analytically contained in the concept of 'adding 7 and 5' - we need intuition to see that they are equal."
        },
        {
          id: "reason-1",
          question: "What is the central question of the Critique of Pure Reason?",
          options: [
            "What is pure reason?",
            "How are synthetic judgments a priori possible?",
            "What is mathematics?",
            "How do we learn arithmetic?"
          ],
          correctAnswer: 1,
          explanation: "The central question is how synthetic a priori judgments are possible, as this explains how we can have knowledge that is both necessary and informative."
        }
      ],
      diagram: {
        title: "Kant's Analysis of Mathematical Knowledge",
        description: "Visualization of how mathematical judgments combine necessity and informativeness",
        mermaidDefinition: `graph TB
    A[Mathematical Judgments] --> B[A Priori]
    A --> C[Synthetic]
    
    B --> D[Necessary/Universal]
    B --> E[Independent of Experience]
    
    C --> F[Informative]
    C --> G[Requires Intuition]
    
    H[Example: 7+5=12] --> I[Not from Concepts Alone]
    H --> J[Needs Counting/Construction]
    
    style A fill:#e6e6fa
    style B fill:#f0f0f0
    style C fill:#f0f0f0
    style D fill:#e6e6fa
    style E fill:#f0f0f0
    style F fill:#e6e6fa
    style G fill:#e6e6fa
    style H fill:#f0f0f0
    style I fill:#e6e6fa
    style J fill:#e6e6fa`
      }
    }
  ];

  const currentSection = sections[currentSectionIndex];

  const handleQuizSubmit = () => {
    let score = 0;
    currentSection.quiz?.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score += 100;
      }
    });
    setXp(prev => prev + score);
    setQuizSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>{seoMetadata.title}</title>
        <meta name="description" content={seoMetadata.description} />
        <meta name="keywords" content={seoMetadata.keywords} />
        <meta property="og:title" content={seoMetadata.openGraph.title} />
        <meta property="og:description" content={seoMetadata.openGraph.description} />
        <meta property="og:type" content={seoMetadata.openGraph.type} />
        <meta property="og:locale" content={seoMetadata.openGraph.locale} />
        <link rel="canonical" href="https://your-domain.com/kant/critique-of-pure-reason" />
      </Head>

      <main className="reading-interface" role="main" aria-label="Reading interface for Kant's Critique of Pure Reason">
        <article className="philosophical-text">
          <header className="text-header">
            <h1 className="text-title">Critique of Pure Reason</h1>
            <p className="text-author">by Immanuel Kant</p>
            
            <div className="language-controls" role="toolbar" aria-label="Language selection">
              <Select value={selectedLanguage} onValueChange={(value: LanguageCode) => setSelectedLanguage(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <nav className="section-navigation" aria-label="Section navigation">
            <Button
              variant="outline"
              onClick={() => setCurrentSectionIndex(i => Math.max(0, i - 1))}
              disabled={currentSectionIndex === 0}
              aria-label="Previous section"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentSectionIndex(i => Math.min(sections.length - 1, i + 1))}
              disabled={currentSectionIndex === sections.length - 1}
              aria-label="Next section"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>

          <section className="current-section" aria-labelledby="current-section-title">
            <h2 id="current-section-title">{sections[currentSectionIndex].title}</h2>
            <div className="text-content">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => <p className="text-content-paragraph" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-content-heading" {...props} />
                }}
              >
                {sections[currentSectionIndex].content}
              </ReactMarkdown>
            </div>
          </section>

          <aside className="study-aids" aria-label="Study aids">
            <section className="insights" aria-labelledby="insights-title">
              <h3 id="insights-title">Key Insights</h3>
              <div className="insight-content">
                {sections[currentSectionIndex].insight}
              </div>
            </section>

            {sections[currentSectionIndex].vocabulary && (
              <section className="vocabulary" aria-labelledby="vocabulary-title">
                <h3 id="vocabulary-title">Key Terms</h3>
                <dl className="vocabulary-list">
                  {sections[currentSectionIndex].vocabulary.map(term => (
                    <div key={term.term} className="vocabulary-item">
                      <dt>{term.term}</dt>
                      <dd>
                        <strong>Definition:</strong> {term.definition}<br />
                        <strong>Usage:</strong> {term.usage}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {sections[currentSectionIndex].diagram && (
              <section className="diagrams" aria-labelledby="diagram-title">
                <h3 id="diagram-title">{sections[currentSectionIndex].diagram.title}</h3>
                <figure>
                  <MermaidDiagram chart={sections[currentSectionIndex].diagram.mermaidDefinition} />
                  <figcaption>{sections[currentSectionIndex].diagram.description}</figcaption>
                </figure>
              </section>
            )}
          </aside>
        </article>
      </main>
    </>
  )
}
